# Etailflow Clock · 三语员工打卡网站（GitHub Pages）

手机优先的网页：中文 / English / Español，员工在工作地点 **10 m** 定位范围内才能上下班打卡。员工端：打卡、记录、请假/补卡申请；管理员端：今日在岗、全员考勤（导出 CSV）、审批、多地点（半径、坐标、GPS 容差）、员工管理。

## 文件
- `Etailflow Clock Web.dc.html` — 网站本体（设计 + 可运行原型）
- `store.js` — 数据层：本机缓存 + 可选 Supabase 同步
- `assets/etailflow-logo.png`

## 部署到 GitHub Pages（免费域名 `用户名.github.io/仓库名`）
1. 导出为单文件 HTML（“另存为独立 HTML”），改名为 `index.html`。
2. 新建 GitHub 仓库（Public），上传 `index.html`。
3. Settings → Pages → Source 选 `main` 分支根目录 → Save。
4. 几分钟后访问 `https://<用户名>.github.io/<仓库名>/`。
   GitHub Pages 自带 HTTPS —— 手机浏览器只在 HTTPS 下允许定位。

## 接 Supabase（免费后端，让所有手机共享数据）
1. supabase.com 新建项目 → SQL Editor 运行下面的 SQL。
2. 管理员登录网站 → 我 → 填入 Project URL 和 anon public key → 连接。首次连接会把本机演示数据推上去。

```sql
create table sites (id text primary key, name text, address text, lat double precision, lng double precision, radius int default 10, tolerance boolean default true);
create table employees (id text primary key, name text, role text default 'employee', "siteId" text);
create table punches (id text primary key, "empId" text, "siteId" text, type text, t timestamptz, dist double precision, acc double precision, "viaRequest" text);
create table requests (id text primary key, "empId" text, kind text, date text, "punchType" text, time text, days int, hours int, reason text, status text default 'pending', "createdAt" timestamptz);
-- 原型使用 anon key 直接读写；上线前请加 RLS 策略或改为登录后访问
alter table sites enable row level security; alter table employees enable row level security; alter table punches enable row level security; alter table requests enable row level security;
create policy "open" on sites for all using (true) with check (true);
create policy "open" on employees for all using (true) with check (true);
create policy "open" on punches for all using (true) with check (true);
create policy "open" on requests for all using (true) with check (true);
```

## 演示账号
管理员 `1001`（Marisol Alvarez）；员工 `1002` 李伟、`1003` Dana Reyes、`1004` 王芳、`1005` Carlos Mendoza、`1006` Sofía Herrera。
默认地点：1800 Ogletown Rd Ste B, Newark, DE 19711（39.6861401, -75.7192305），半径 10 m。管理员可在“地点”里站在打卡点按“使用我当前的位置”校准坐标。

## 定位判定
- `distance ≤ radius` → 可打卡；否则按钮锁定并显示距离与 GPS 精度。
- 地点开启“GPS 误差补偿”时：精度 ≤ 30 m 且 `distance − accuracy ≤ radius` 也放行（10 m 半径配合手机 GPS 常见 ±5–15 m 误差时建议开启）。
- 定位每次变化都实时重新判定；不在范围内只能提交“补卡申请”由管理员批准。
