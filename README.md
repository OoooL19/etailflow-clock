# Etailflow Clock · 三语员工打卡网站

网站：https://ooool19.github.io/etailflow-clock/

手机优先的网页（中文 / English / Español）。员工在工作地点打卡半径内才能上下班打卡；数据存在 Supabase，所有手机共享同一份数据。

## 角色

| 角色 | 能做什么 |
| --- | --- |
| 主管理员 | 看所有人的今日在岗、考勤（导出 CSV）；审批请假/补卡；管理地点和员工；把员工分配给小组长 |
| 小组长 | 自己正常打卡（可设为免打卡）；在“小组后台”查看自己组员的今日在岗、考勤和申请（只读，不能审批） |
| 员工 | 打卡、看自己的记录、提交请假/补卡申请 |

- 分配组员：主管理员 → 管理员后台 → 员工 → 点开某位小组长 → 在“组员”里点选员工；或点开某位员工 → 选“所属小组长”。
- 免打卡：主管理员在小组长（或主管理员）的编辑页打开“免打卡”。免打卡的人不出现在考勤和缺卡统计里。
- 初始只有一个主管理员账号 `1001`，登录后在“员工”里改名、添加其他人。

## 文件

- `index.html` — 网站本体（单文件，字体、图标、程序都打包在里面）
- `src/app.template.html` — 页面结构
- `src/app.logic.js` — 页面逻辑（角色、打卡、审批、同步）
- `src/store.js` — 数据层（本机缓存 + Supabase 同步）
- `src/config.json` — Supabase 项目地址和公开 key
- `build.py` — 把 `src/` 里的内容重新打包进 `index.html`
- `deploy.command` — 双击发布到 GitHub Pages

## 更新网站

1. 改 `src/` 里的文件。
2. 运行 `python3 build.py` 重新生成 `index.html`。
3. 双击 `deploy.command` 推送到 GitHub，1–3 分钟后生效。

## Supabase 建表 SQL

在 Supabase → SQL Editor 里运行一次：

```sql
create table if not exists sites (id text primary key, name text, address text, lat double precision, lng double precision, radius int default 10, tolerance boolean default true);
create table if not exists employees (id text primary key, name text, role text default 'employee', "siteId" text, "leaderId" text, "noPunch" boolean default false);
create table if not exists punches (id text primary key, "empId" text, "siteId" text, type text, t timestamptz, dist double precision, acc double precision, "viaRequest" text);
create table if not exists requests (id text primary key, "empId" text, kind text, date text, "punchType" text, time text, days int, hours int, reason text, status text default 'pending', "createdAt" timestamptz);
create index if not exists punches_t_idx on punches (t);
alter table sites enable row level security;
alter table employees enable row level security;
alter table punches enable row level security;
alter table requests enable row level security;
create policy "open" on sites for all using (true) with check (true);
create policy "open" on employees for all using (true) with check (true);
create policy "open" on punches for all using (true) with check (true);
create policy "open" on requests for all using (true) with check (true);
grant select, insert, update, delete on sites, employees, punches, requests to anon, authenticated;
```

**安全提醒：** 上面的 `"open"` 策略是完全开放的——网站没有密码登录，任何拿到网址里公开 key 的人都能读写这些表（包括改打卡记录、把自己设成管理员）。角色权限目前只是界面上的限制。内部试用可以，正式长期使用前建议加上登录验证并收紧策略。

## 数据同步

- 每次打卡/修改先存在本机，再推送到 Supabase；没网时会排队，恢复后自动补传。
- 每分钟以及回到页面时会自动拉取最新数据。
- 打卡记录只加载最近 100 天（更早的仍保存在 Supabase 里）。

## 定位判定

- `距离 ≤ 半径` → 可打卡；否则按钮锁定并显示距离与 GPS 精度。
- 地点开启“GPS 误差补偿”时：精度 ≤ 30 m 且 `距离 − 精度 ≤ 半径` 也放行（10 m 半径配合手机 GPS 常见 ±5–15 m 误差时建议开启）。
- 不在范围内只能提交“补卡申请”，由主管理员批准。
- 默认地点：1800 Ogletown Rd Ste B, Newark, DE 19711，半径 10 m。主管理员可在“地点”里站在打卡点按“使用我当前的位置”校准坐标。
