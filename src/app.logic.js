const DICT = {
  loginTitle: ['欢迎回来', 'Welcome back', 'Bienvenido de nuevo'],
  loginSub: ['输入员工编号和 PIN', 'Enter your employee ID and PIN', 'Ingresa tu número de empleado y PIN'],
  pinPh: ['PIN', 'PIN', 'PIN'],
  loginBad: ['编号或 PIN 不正确', 'Wrong ID or PIN', 'Número o PIN incorrecto'],
  loginLocked: ['输错次数过多，账号已锁定 15 分钟', 'Too many wrong tries — locked for 15 minutes', 'Demasiados intentos: bloqueado 15 minutos'],
  loginNet: ['无法连接服务器，请检查网络', 'Cannot reach the server — check your connection', 'No se puede conectar: revisa tu conexión'],
  sessionExpired: ['登录已失效，请重新登录', 'Signed out — please sign in again', 'Sesión cerrada: vuelve a entrar'],
  pinSetTitle: ['设置你的 PIN', 'Set your PIN', 'Crea tu PIN'], pinChangeTitle: ['修改 PIN', 'Change PIN', 'Cambiar PIN'],
  pinSetSub: ['首次登录需要设置自己的 PIN，以后用它登录。', 'First sign-in: choose your own PIN. You will use it to sign in from now on.', 'Primer acceso: elige tu PIN. Lo usarás para entrar.'],
  pinOld: ['当前 PIN', 'Current PIN', 'PIN actual'], pinNew: ['新 PIN', 'New PIN', 'PIN nuevo'], pinAgain: ['再输入一次', 'Repeat new PIN', 'Repite el PIN'],
  pinRule: ['至少 {n} 位，不能用 1234、1111 这类简单组合', 'At least {n} characters; not something simple like 1234 or 1111', 'Mínimo {n} caracteres; nada simple como 1234 o 1111'],
  pinMismatch: ['两次输入不一致', 'The two entries do not match', 'Los PIN no coinciden'], pinSaved: ['PIN 已更新', 'PIN updated', 'PIN actualizado'],
  pinWeak: ['PIN 太简单或太短', 'PIN is too simple or too short', 'PIN demasiado simple o corto'], pinOldBad: ['当前 PIN 不正确', 'Current PIN is wrong', 'PIN actual incorrecto'],
  changePin: ['修改 PIN', 'Change PIN', 'Cambiar PIN'],
  pinInitial: ['初始 PIN（员工首次登录后要自己改）', 'Starting PIN (they must change it at first sign-in)', 'PIN inicial (deberá cambiarlo al entrar)'],
  pinReset: ['重置 PIN（留空则不变）', 'Reset PIN (leave empty to keep)', 'Restablecer PIN (vacío = sin cambio)'],
  pinNeed: ['请为新员工设置初始 PIN', 'Set a starting PIN for the new employee', 'Define un PIN inicial'],
  pinSetOk: ['PIN 已设置', 'PIN set', 'PIN definido'], pinSetFail: ['PIN 没有设置成功，请重新打开该员工再设一次', 'PIN was not set — open the employee and try again', 'No se definió el PIN: inténtalo de nuevo'],
  noPinYet: ['未设 PIN', 'no PIN yet', 'sin PIN'],
  srvRange: ['服务器判定不在打卡范围，这次打卡没有记录', 'Server says you are out of range — punch not recorded', 'Fuera de rango según el servidor: no se registró'],
  srvTime: ['打卡时间已过期，没有记录，请提交补卡申请', 'Punch was too old to accept — please request a fix', 'Fichaje caducado: solicita una corrección'],
  srvForbidden: ['没有权限做这个操作', 'You are not allowed to do that', 'No tienes permiso'],
  srvRejected: ['服务器没有接受这次修改', 'The server did not accept this change', 'El servidor rechazó el cambio'],
  loginPh: ['员工编号或姓名', 'Employee ID or name', 'Número o nombre'],
  enter: ['进入', 'Continue', 'Continuar'],
  notFound: ['找不到该员工，请检查编号或姓名', 'No match — check your ID or name', 'No encontrado: revisa tu número o nombre'],
  loginFoot: ['打卡需要定位权限，仅在工作地点附近可打卡。', 'Clocking in needs location access and only works near your work site.', 'Fichar requiere ubicación y solo funciona cerca de tu sitio de trabajo.'],
  morning: ['早上好', 'Good morning', 'Buenos días'], afternoon: ['下午好', 'Good afternoon', 'Buenas tardes'], evening: ['晚上好', 'Good evening', 'Buenas noches'],
  tabClock: ['打卡', 'Clock', 'Fichar'], tabHistory: ['记录', 'History', 'Historial'], tabRequests: ['申请', 'Requests', 'Solicitudes'], tabMe: ['我', 'Me', 'Yo'],
  locating: ['正在定位…', 'Locating…', 'Ubicando…'],
  locatingSub: ['请允许浏览器使用定位', 'Allow location access in your browser', 'Permite el acceso a la ubicación'],
  denied: ['无法获取定位', 'Location unavailable', 'Ubicación no disponible'],
  deniedSub: ['请在浏览器设置中允许定位后重试', 'Enable location in your browser settings and retry', 'Activa la ubicación en el navegador y reintenta'],
  retry: ['重试', 'Retry', 'Reintentar'],
  onSite: ['已到达 · {site}', 'On-site · {site}', 'En el sitio · {site}'],
  inRange: ['距打卡点 {d} m · 范围内 · 精度 ±{a} m', '{d} m from the clock-in point · within range · ±{a} m', 'A {d} m del punto · en rango · ±{a} m'],
  outRange: ['不在打卡范围', 'Out of range', 'Fuera de rango'],
  outRangeSub: ['距 {site} {d} m · 需在 {r} m 内 · 精度 ±{a} m', '{d} m from {site} · need ≤ {r} m · ±{a} m', 'A {d} m de {site} · debe ser ≤ {r} m · ±{a} m'],
  poorAcc: ['GPS 信号弱（±{a} m），请到空旷处或窗边再试', 'Weak GPS (±{a} m) — step outside or near a window', 'GPS débil (±{a} m): sal al exterior o acércate a una ventana'],
  clockIn: ['上班打卡', 'Clock in', 'Entrada'], clockOut: ['下班打卡', 'Clock out', 'Salida'],
  lockedOut: ['已锁定 · 不在范围内', 'Locked · out of range', 'Bloqueado · fuera de rango'],
  lockedGps: ['已锁定 · 等待定位', 'Locked · waiting for GPS', 'Bloqueado · esperando GPS'],
  notClockedIn: ['今天还未打卡', 'Not clocked in yet', 'Aún sin fichar hoy'],
  shiftHint: ['今天还未上班打卡', 'Not clocked in yet today', 'Aún no has fichado hoy'],
  clockedInAt: ['{t} 已上班 · 已工作 {dur}', 'Clocked in {t} · {dur} worked', 'Entrada {t} · {dur} trabajadas'],
  clockedOutAt: ['{t} 已下班 · 今日 {dur}', 'Clocked out {t} · {dur} today', 'Salida {t} · {dur} hoy'],
  walkText: ['请走近 {site}，仅允许在打卡点 {r} m 内打卡。', 'Walk toward {site}. Punches are only allowed within {r} m.', 'Acércate a {site}. Solo se permite fichar a menos de {r} m.'],
  cantGetThere: ['无法到达？申请补卡', "Can't get there? Request a fix", '¿No puedes llegar? Solicita corrección'],
  mapLabel: ['site map placeholder', 'site map placeholder', 'site map placeholder'], you: ['你', 'You', 'Tú'],
  todayPunches: ['今日打卡', "Today's punches", 'Fichajes de hoy'], yesterday: ['昨天', 'Yesterday', 'Ayer'],
  punchIn: ['上班', 'Clock in', 'Entrada'], punchOut: ['下班', 'Clock out', 'Salida'],
  viaFix: ['补卡 · 已批准', 'Fix · approved', 'Corrección · aprobada'],
  confirmIn: ['确认上班打卡', 'Confirm clock in', 'Confirmar entrada'], confirmOut: ['确认下班打卡', 'Confirm clock out', 'Confirmar salida'],
  time: ['时间', 'Time', 'Hora'], site: ['工作地点', 'Work site', 'Sitio'], employee: ['员工', 'Employee', 'Empleado'],
  confirm: ['确认打卡', 'Confirm', 'Confirmar'], cancel: ['取消', 'Cancel', 'Cancelar'],
  doneIn: ['上班打卡成功', 'Clocked in', 'Entrada registrada'], doneOut: ['下班打卡成功', 'Clocked out', 'Salida registrada'],
  toastOutRange: ['不在范围内 — 请走到 {site} {r} m 内', 'Out of range — move within {r} m of {site}', 'Fuera de rango: acércate a {r} m de {site}'],
  toastNoGps: ['等待定位中，请稍候', 'Waiting for GPS, one moment', 'Esperando GPS, un momento'],
  history: ['记录', 'History', 'Historial'], thisWeek: ['本周', 'This week', 'Esta semana'],
  daysWorked: ['出勤天数', 'Days worked', 'Días'], avgIn: ['平均上班', 'Avg clock-in', 'Entrada media'], missing: ['缺卡', 'Missing', 'Faltantes'],
  noPunch: ['无打卡', 'No punches', 'Sin fichajes'], missingOut: ['缺下班卡', 'Missing clock-out', 'Falta salida'],
  inChip: ['上班 {t}', 'In {t}', 'Entrada {t}'], outChip: ['下班 {t}', 'Out {t}', 'Salida {t}'],
  today: ['今天', 'Today', 'Hoy'],
  requests: ['申请', 'Requests', 'Solicitudes'], leaveAndFix: ['请假 · 补卡', 'Leave · missed punch', 'Permisos · correcciones'],
  newRequest: ['+ 新申请', '+ New', '+ Nueva'], newRequestTitle: ['新申请', 'New request', 'Nueva solicitud'],
  leave: ['请假', 'Leave', 'Permiso'], fix: ['补卡', 'Missed punch', 'Corrección'],
  pending: ['待审批', 'Pending', 'Pendiente'], approved: ['已批准', 'Approved', 'Aprobada'], denied_: ['已拒绝', 'Denied', 'Rechazada'],
  noRequests: ['暂无申请', 'No requests yet', 'Sin solicitudes'],
  reqType: ['类型', 'Type', 'Tipo'], date: ['日期', 'Date', 'Fecha'], punchType: ['打卡类型', 'Punch', 'Tipo de fichaje'],
  reason: ['原因', 'Reason', 'Motivo'], reasonPh: ['简要说明…', 'Brief note…', 'Breve nota…'], send: ['提交申请', 'Send request', 'Enviar solicitud'],
  leaveDays: ['请假天数', 'Days', 'Días'], leaveHours: ['每天请假小时数', 'Hours per day', 'Horas por día'],
  halfDay: ['半天 4h', 'Half day 4h', 'Medio día 4h'], fullDay: ['全天 8h', 'Full day 8h', 'Día completo 8h'],
  leaveTotal: ['{d} 天 × {h} h = 共 {t} h', '{d} day(s) × {h} h = {t} h total', '{d} día(s) × {h} h = {t} h en total'], dayUnit: ['{n} 天', '{n} day(s)', '{n} día(s)'],
  fixDetail: ['{date} · 补{pt}卡 {time}', '{date} · {pt} at {time}', '{date} · {pt} a las {time}'],
  leaveDetail: ['{date} 起 · {n} 天 · 每天 {h} h · 共 {t} h', 'From {date} · {n} day(s) · {h} h/day · {t} h total', 'Desde {date} · {n} día(s) · {h} h/día · {t} h en total'],
  toastSent: ['申请已提交', 'Request sent', 'Solicitud enviada'],
  toastApproved: ['已批准', 'Approved', 'Aprobada'], toastDenied: ['已拒绝', 'Denied', 'Rechazada'],
  employeeId: ['员工编号', 'Employee ID', 'Nº de empleado'], name: ['姓名', 'Name', 'Nombre'],
  radius: ['打卡半径', 'Punch radius', 'Radio de fichaje'], language: ['语言', 'Language', 'Idioma'],
  dataConn: ['数据存储', 'Data storage', 'Datos'], local: ['离线（恢复后自动同步）', 'Offline (syncs when back)', 'Sin conexión (se sincroniza luego)'], remote: ['云端已同步', 'Cloud synced', 'Sincronizado'],
  sbTitle: ['连接 Supabase（免费后端）', 'Connect Supabase (free backend)', 'Conectar Supabase (backend gratis)'],
  sbIntro: ['连接后所有打卡和申请会同步到云端，所有手机共享同一份数据。见 README 建表 SQL。', 'Once connected, punches and requests sync to the cloud and every phone shares the same data. See README for the table SQL.', 'Al conectar, fichajes y solicitudes se sincronizan en la nube y todos los teléfonos comparten los datos. Ver README para el SQL.'],
  connect: ['连接', 'Connect', 'Conectar'], connecting: ['连接中…', 'Connecting…', 'Conectando…'], disconnect: ['断开', 'Disconnect', 'Desconectar'],
  sbFail: ['连接失败，请检查 URL、Key 和表是否已创建', 'Connection failed — check URL, key and that tables exist', 'Error de conexión: revisa URL, clave y tablas'],
  openAdmin: ['管理员后台', 'Admin console', 'Panel de administrador'], signOut: ['退出登录', 'Sign out', 'Cerrar sesión'],
  admin: ['主管理员', 'Main admin', 'Admin principal'], roleEmp: ['员工', 'Employee', 'Empleado'], leader: ['小组长', 'Team lead', 'Jefe de equipo'],
  openLead: ['小组后台', 'Team console', 'Panel del equipo'],
  leaderOf: ['所属小组长', 'Team lead', 'Jefe de equipo'], noLeader: ['未分配', 'Unassigned', 'Sin asignar'],
  members: ['组员', 'Team members', 'Miembros del equipo'], membersHint: ['点选员工，分配到这位小组长名下。', 'Tap employees to assign them to this team lead.', 'Toca empleados para asignarlos a este jefe.'],
  noEmpsYet: ['还没有可分配的员工', 'No employees to assign yet', 'Aún no hay empleados para asignar'],
  membersCount: ['{n} 名组员', '{n} members', '{n} miembros'], leadLine: ['组长 {n}', 'Lead: {n}', 'Jefe: {n}'],
  exempt: ['免打卡', 'No clock-in needed', 'Sin fichaje'],
  exemptSub: ['开启后此人无需打卡，也不计入考勤和缺卡统计。', 'When on, this person does not clock in and is left out of attendance.', 'Si se activa, no ficha y no cuenta en la asistencia.'],
  exemptTitle: ['你无需打卡', "You don't need to clock in", 'No necesitas fichar'],
  exemptBody: ['你的账号已设为免打卡。可以在后台查看组员的考勤。', 'Your account is exempt from clocking in. Open the console to see your team.', 'Tu cuenta está exenta de fichar. Abre el panel para ver a tu equipo.'],
  noMembers: ['还没有组员，请联系主管理员分配。', 'No team members yet — ask the main admin to assign them.', 'Aún sin miembros: pide al admin principal que los asigne.'],
  lastAdmin: ['至少要保留一位主管理员', 'Keep at least one main admin', 'Debe quedar al menos un admin principal'],
  syncFail: ['同步失败，网络恢复后会自动重试', 'Sync failed — will retry when back online', 'Error de sincronización: se reintentará'],
  mToday: ['今日', 'Today', 'Hoy'], mAtt: ['考勤', 'Attendance', 'Asistencia'], mReq: ['审批', 'Requests', 'Solicitudes'], mSites: ['地点', 'Sites', 'Sitios'], mTeam: ['员工', 'Team', 'Equipo'],
  working: ['在岗', 'Working', 'Trabajando'], left: ['已下班', 'Left', 'Salió'], off: ['未打卡', 'Off', 'Sin fichar'],
  since: ['{t} 起', 'since {t}', 'desde {t}'], leftAt: ['{t} 下班', 'left {t}', 'salió {t}'],
  hours: ['工时', 'Hours', 'Horas'], exportDay: ['导出当日 CSV', 'Export day CSV', 'CSV del día'], exportMonth: ['导出本月 CSV', 'Export month CSV', 'CSV del mes'],
  attSummary: ['{n} 人出勤 · {m} 人缺卡', '{n} present · {m} missing punches', '{n} presentes · {m} con faltas'],
  approve: ['批准', 'Approve', 'Aprobar'], deny: ['拒绝', 'Deny', 'Rechazar'],
  sitesIntro: ['每个地点有自己的打卡点和半径。员工到任一地点的半径内即可打卡，记录会标注地点。', 'Each site has its own clock-in point and radius. Employees can punch within any site\'s radius; the record is tagged with that site.', 'Cada sitio tiene su punto y radio. Los empleados pueden fichar dentro del radio de cualquier sitio; el registro indica el sitio.'],
  newSite: ['+ 新增地点', '+ New site', '+ Nuevo sitio'], siteName: ['地点名称', 'Site name', 'Nombre del sitio'],
  address: ['地址', 'Address', 'Dirección'], latLng: ['坐标（纬度 · 经度）', 'Coordinates (lat · lng)', 'Coordenadas (lat · lng)'],
  useHere: ['使用我当前的位置作为打卡点', 'Use my current location as the clock-in point', 'Usar mi ubicación actual como punto'],
  useHereBusy: ['定位中…', 'Locating…', 'Ubicando…'], useHereDone: ['已更新 · 精度 ±{a} m', 'Updated · ±{a} m', 'Actualizado · ±{a} m'],
  strict: ['严格', 'strict', 'estricto'], wide: ['宽松', 'wide', 'amplio'],
  tolerance: ['GPS 误差补偿', 'GPS tolerance', 'Tolerancia GPS'],
  toleranceSub: ['当手机精度在 30 m 内时，按“距离 − 精度”判定，减少误拦。', 'When accuracy is within 30 m, judge by distance − accuracy to reduce false blocks.', 'Con precisión ≤ 30 m, se evalúa distancia − precisión para evitar bloqueos falsos.'],
  employees_: ['{n} 名员工', '{n} employees', '{n} empleados'],
  save: ['保存', 'Save', 'Guardar'], remove: ['删除', 'Remove', 'Eliminar'],
  addEmployee: ['+ 添加员工', '+ Add employee', '+ Agregar'], editEmployee: ['编辑员工', 'Edit employee', 'Editar empleado'], newEmployee: ['新员工', 'New employee', 'Nuevo empleado'],
  role: ['角色', 'Role', 'Rol'], idTaken: ['该编号已存在', 'This ID is already used', 'Este número ya existe'], needFields: ['请填写姓名和编号', 'Name and ID are required', 'Nombre y número obligatorios'],
  saved: ['已保存', 'Saved', 'Guardado'], siteInUse: ['仍有员工属于该地点', 'Employees are still assigned here', 'Aún hay empleados asignados'],
};
const LOCALE = { zh: 'zh-CN', en: 'en-US', es: 'es' };
const WK = { bg: '#E6F6EC', fg: '#17603A', dot: '#2E9E5B' };

class Component extends DCLogic {
  state = { lang: null, db: null, me: null, screen: 'login', tab: 'clock', mTab: 'today', loginInput: '', loginPin: '', loginMsg: '', loginBusy: false, pc: null, geo: { state: 'locating' }, now: new Date(), sheet: null, sheetStep: 'confirm', toast: null, rq: null, attDate: null, se: null, seHere: '', ee: null, eeErr: '', sbOn: false };

  async componentDidMount() {
    this.S = await import(window.__resources && window.__resources.storeJs || './store.js');
    const S = this.S;
    this.remote = new S.Remote(S.SB, localStorage.getItem(S.LS_TOKEN) || '');
    // The cached copy lets a signed-in phone open instantly (and offline); the server copy replaces it right after.
    const db = (this.remote.token && S.loadLocal()) || S.emptyDb();
    const me = db.employees.find(e => e.id === localStorage.getItem(S.LS_ME)) || null;
    if (!me || !db.sites.length) this.remote.token = '';
    const lang = localStorage.getItem(S.LS_LANG);
    this.setState({ db: this.remote.token ? db : S.emptyDb(), me: this.remote.token ? me : null, screen: this.remote.token ? 'app' : 'login', lang: lang || null, attDate: S.dayKey(new Date()) });
    if (this.remote.token) this.refreshRemote();
    this.timer = setInterval(() => this.setState({ now: new Date() }), 1000);
    this.refreshTimer = setInterval(() => this.refreshRemote(), 60000);
    this.onVis = () => { if (!document.hidden) this.refreshRemote(); };
    document.addEventListener('visibilitychange', this.onVis);
    this.startGeo();
  }
  componentWillUnmount() { clearInterval(this.timer); clearInterval(this.refreshTimer); document.removeEventListener('visibilitychange', this.onVis); this.stopGeo(); }
  componentDidUpdate(prev) { if (prev.gpsMode !== this.props.gpsMode) this.startGeo(); }

  // ---- geo
  mode() { return this.props.gpsMode || 'real'; }
  stopGeo() { if (this.watch != null && navigator.geolocation) navigator.geolocation.clearWatch(this.watch); this.watch = null; }
  startGeo() {
    this.stopGeo();
    const m = this.mode();
    if (m === 'denied') return this.setState({ geo: { state: 'denied' } });
    if (m === 'inside' || m === 'outside') {
      const site = this.mySite() || (this.state.db && this.state.db.sites[0]);
      const off = (m === 'inside' ? 4 : 38) / 111320;
      if (site) return this.setState({ geo: { state: 'ok', lat: site.lat + off, lng: site.lng, acc: 5 } });
      return setTimeout(() => this.startGeo(), 300);
    }
    if (!navigator.geolocation) return this.setState({ geo: { state: 'denied' } });
    this.setState({ geo: { state: 'locating' } });
    this.watch = navigator.geolocation.watchPosition(
      p => this.setState({ geo: { state: 'ok', lat: p.coords.latitude, lng: p.coords.longitude, acc: Math.round(p.coords.accuracy || 0) } }),
      () => this.setState({ geo: { state: 'denied' } }),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 });
  }
  mySite() { const { db, me } = this.state; if (!db) return null; return db.sites.find(s => s.id === (me && me.siteId)) || db.sites[0]; }
  nearest() {
    const { db, geo } = this.state; if (!db || !db.sites.length) return null;
    if (geo.state !== 'ok') return { site: this.mySite(), dist: null };
    let best = null;
    db.sites.forEach(s => { const d = this.S.haversine(geo.lat, geo.lng, s.lat, s.lng); if (!best || d < best.dist) best = { site: s, dist: d }; });
    return best;
  }

  // ---- i18n
  lang() { return this.state.lang || this.props.language || (navigator.language.startsWith('zh') ? 'zh' : navigator.language.startsWith('es') ? 'es' : 'en'); }
  t(k, v) { const L = this.lang(), i = L === 'zh' ? 0 : L === 'en' ? 1 : 2; let s = (DICT[k] || ['', '', ''])[i]; if (v) Object.keys(v).forEach(x => { s = s.split('{' + x + '}').join(v[x]); }); return s; }
  loc() { return LOCALE[this.lang()]; }
  fmtT(d) { d = new Date(d); return this.lang() === 'en' ? d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
  fmtD(d, o) { return new Date(d).toLocaleDateString(this.loc(), o || { weekday: 'short', month: 'short', day: 'numeric' }); }
  fmtDur(ms) { const h = Math.floor(ms / 36e5), m = Math.floor((ms % 36e5) / 6e4); return h + 'h ' + String(m).padStart(2, '0') + 'm'; }
  init(n) { if (!n) return '?'; if (/[\u3400-\u9fff]/.test(n)) return n.slice(0, 1); return n.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase(); }
  dayFromKey(k) { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); }

  // ---- data
  // Every change is saved locally first, then queued and sent to the server.
  // The queue survives reloads, so a punch made without signal is sent once the phone is back online.
  outbox() { try { return JSON.parse(localStorage.getItem(this.S.LS_OUT)) || []; } catch (e) { return []; } }
  setOutbox(q) { try { localStorage.setItem(this.S.LS_OUT, JSON.stringify(q)); } catch (e) {} }
  dropFirst() { const q = this.outbox(); q.shift(); this.setOutbox(q); }
  persist(db, changes) {
    this.S.saveLocal(db); this.setState({ db });
    if (changes && changes.length && this.state.me) { const by = this.state.me.id; this.setOutbox(this.outbox().concat(changes.map(c => ({ by, c })))); this.flush(); }
  }
  flush() {
    if (!this.flushP) this.flushP = this.flushRun().finally(() => { this.flushP = null; });
    return this.flushP;
  }
  async flushRun() {
    let rejected = false;
    try {
      let q;
      while ((q = this.outbox()).length) {
        const me = this.state.me;
        if (!this.remote.token || !me) return false;
        if (q[0].by !== me.id) { this.dropFirst(); continue; }  // left over from another account on this phone
        const [table, row, del] = q[0].c;
        try { await this.remote.apply(table, row, del); }
        catch (e) {
          if (e.code === 'EF_AUTH' || e.code === 'EF_MUST_CHANGE') { this.authLost(); return false; }
          // The server looked at the change and said no (out of range, no permission…): it will never succeed, so drop it.
          if (e.code || e.status === 400 || e.status === 409 || e.status === 422) { console.warn('rejected', table, e.message); rejected = true; this.dropFirst(); this.showToast(this.errText(e), '#D9453B'); continue; }
          throw e;
        }
        this.dropFirst();
      }
      this.syncWarned = false; return true;
    } catch (e) {
      console.warn('sync', e);
      if (!this.syncWarned) { this.syncWarned = true; this.showToast(this.t('syncFail'), '#D9453B'); }
      if (this.state.sbOn) this.setState({ sbOn: false });
      return false;
    } finally {
      if (rejected) setTimeout(() => this.refreshRemote(), 50);  // show what the server actually has
    }
  }
  errText(e) {
    if (e && e.network) return this.t('loginNet');
    const k = { EF_PIN_WEAK: 'pinWeak', EF_PIN_OLD: 'pinOldBad', EF_RANGE: 'srvRange', EF_TIME: 'srvTime', EF_FORBIDDEN: 'srvForbidden', EF_LAST_ADMIN: 'lastAdmin', EF_IN_USE: 'siteInUse' }[e && e.code];
    return this.t(k || 'srvRejected');
  }
  // Replace the local copy with what the server says this person may see.
  applyDb(r) {
    const db = { sites: r.sites || [], employees: r.employees || [], punches: r.punches || [], requests: r.requests || [] };
    const me = db.employees.find(e => e.id === r.me);
    if (!me || !db.sites.length) { this.authLost(); return false; }
    this.S.saveLocal(db); localStorage.setItem(this.S.LS_ME, me.id);
    this.setState({ db, me, sbOn: true }); return true;
  }
  forget() { const S = this.S; this.remote.token = ''; localStorage.removeItem(S.LS_TOKEN); localStorage.removeItem(S.LS_ME); S.clearLocal(); }
  authLost() { this.forget(); this.setState({ me: null, screen: 'login', db: this.S.emptyDb(), sheet: null, ee: null, se: null, pc: null, loginMsg: this.t('sessionExpired') }); }
  signOut() { if (this.remote.token) this.remote.logout().catch(() => {}); this.forget(); this.setState({ me: null, screen: 'login', db: this.S.emptyDb(), sheet: null, ee: null, se: null, pc: null, loginMsg: '' }); }
  async refreshRemote() {
    if (!this.remote || !this.remote.token || this.refreshing) return;
    this.refreshing = true;
    try {
      if (!(await this.flush()) || this.outbox().length) return;
      const r = await this.remote.sync();
      if (this.outbox().length) return;
      this.applyDb(r);
    } catch (e) {
      if (e.code === 'EF_AUTH') this.authLost();
      else if (e.code === 'EF_MUST_CHANGE') this.setState({ screen: 'setpin', pc: { old: '', a: '', b: '', err: '', forced: true } });
      else { console.warn('refresh', e); if (this.state.sbOn) this.setState({ sbOn: false }); }
    } finally { this.refreshing = false; }
  }
  showToast(text, dot) { clearTimeout(this.tt); this.setState({ toast: text, toastDot: dot || '#2E9E5B' }); this.tt = setTimeout(() => this.setState({ toast: null }), 2600); }
  dayPunches(empId, key) { return this.state.db.punches.filter(p => p.empId === empId && this.S.dayKey(p.t) === key).sort((a, b) => a.t.localeCompare(b.t)); }
  workedMs(ps, liveNow) { let ms = 0, open = null; ps.forEach(p => { if (p.type === 'in') open = new Date(p.t); else if (open) { ms += new Date(p.t) - open; open = null; } }); if (open && liveNow) ms += liveNow - open; return ms; }
  download(name, text) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['\ufeff' + text], { type: 'text/csv' })); a.download = name; a.click(); }
  csvFor(keys, emps) {
    const { db } = this.state; const rows = [[this.t('date'), this.t('employeeId'), this.t('name'), this.t('site'), this.t('clockIn'), this.t('clockOut'), this.t('hours')]];
    keys.forEach(k => emps.forEach(e => { const ps = this.dayPunches(e.id, k); if (!ps.length) return; const i = ps.find(p => p.type === 'in'), o = [...ps].reverse().find(p => p.type === 'out'); const site = db.sites.find(s => s.id === (i || o).siteId); rows.push([k, e.id, e.name, site ? site.name : '', i ? this.fmtT(i.t) : '', o ? this.fmtT(o.t) : '', (this.workedMs(ps) / 36e5).toFixed(2)]); }));
    return this.S.toCsv(rows);
  }

  renderVals() {
    const st = this.state, { db, me, geo, now } = st, S = this.S;
    const L = this.lang(), T = {}; Object.keys(DICT).forEach(k => { T[k] = this.t(k); });
    const langOpts = [['zh', '中文'], ['en', 'EN'], ['es', 'ES']].map(([k, label]) => ({ label, bg: L === k ? '#141A2A' : 'transparent', fg: L === k ? '#fff' : '#6B7280', pick: () => { localStorage.setItem(S.LS_LANG, k); this.setState({ lang: k }); } }));
    const v = { T, langOpts, isLogin: st.screen === 'login', isSetPin: false, isApp: st.screen === 'app', isNewReq: st.screen === 'newreq', isAdmin: false, toast: st.toast, toastDot: st.toastDot || '#2E9E5B', sheetOpen: false };
    if (!db) return v;

    // login
    v.loginInput = st.loginInput; v.loginPin = st.loginPin; v.loginMsg = st.loginMsg; v.loginBorder = st.loginMsg ? '#D9453B' : '#E3E6EC';
    v.loginBtn = st.loginBusy ? T.connecting : T.enter;
    v.setLoginInput = e => this.setState({ loginInput: e.target.value, loginMsg: '' });
    v.setLoginPin = e => this.setState({ loginPin: e.target.value, loginMsg: '' });
    v.login = async () => {
      const id = st.loginInput.trim(), pin = st.loginPin;
      if (!id || st.loginBusy) return;
      this.setState({ loginBusy: true, loginMsg: '' });
      try {
        const r = await this.remote.login(id, pin);
        if (!r || !r.ok) return this.setState({ loginBusy: false, loginPin: '', loginMsg: r && r.error === 'EF_LOCKED' ? T.loginLocked : T.loginBad });
        this.remote.token = r.token; localStorage.setItem(S.LS_TOKEN, r.token); localStorage.setItem(S.LS_ME, r.me.id);
        this.setOutbox(this.outbox().filter(x => x.by === r.me.id));
        const done = { loginBusy: false, loginInput: '', loginPin: '', loginMsg: '' };
        if (r.mustChange) return this.setState(Object.assign(done, { me: r.me, screen: 'setpin', pc: { old: '', a: '', b: '', err: '', forced: true } }));
        if (!this.applyDb(await this.remote.sync())) return this.setState({ loginBusy: false });
        this.setState(Object.assign(done, { screen: 'app', tab: 'clock' }), () => { this.startGeo(); this.flush(); });
      } catch (e) {
        if (this.remote.token && !this.state.me) this.forget();
        this.setState({ loginBusy: false, loginMsg: e.network ? T.loginNet : this.errText(e) });
      }
    };
    v.loginKey = e => { if (e.key === 'Enter') v.login(); };
    if (!me) return v;

    // set / change PIN
    if (st.screen === 'setpin') {
      const pc = st.pc || { old: '', a: '', b: '', err: '', forced: false }, minLen = me.role === 'employee' ? 4 : 6;
      const setPc = patch => this.setState({ pc: Object.assign({}, pc, { err: '' }, patch) });
      v.isSetPin = true; v.myNameLine = me.name + ' · #' + me.id; v.pc = pc; v.pcNeedOld = !pc.forced; v.pcForced = !!pc.forced;
      v.pcTitle = pc.forced ? T.pinSetTitle : T.pinChangeTitle; v.pcRule = this.t('pinRule', { n: minLen });
      v.pcBtn = pc.busy ? T.connecting : T.save; v.pcCancelLabel = pc.forced ? T.signOut : T.cancel;
      v.setPcOld = e => setPc({ old: e.target.value }); v.setPcA = e => setPc({ a: e.target.value }); v.setPcB = e => setPc({ b: e.target.value });
      v.pcCancel = () => { if (pc.forced) this.signOut(); else this.setState({ screen: 'app', tab: 'me', pc: null }); };
      v.pcSubmit = async () => {
        if (pc.busy) return;
        if (pc.a.length < minLen) return setPc({ err: v.pcRule });
        if (pc.a !== pc.b) return setPc({ err: T.pinMismatch });
        setPc({ busy: true });
        try {
          await this.remote.setPin(me.id, pc.a, pc.forced ? null : pc.old);
          if (!this.applyDb(await this.remote.sync())) return;
          this.setState({ screen: 'app', tab: pc.forced ? 'clock' : 'me', pc: null }, () => this.startGeo());
          this.showToast(T.pinSaved);
        } catch (e) {
          if (e.code === 'EF_AUTH') return this.authLost();
          this.setState({ pc: Object.assign({}, pc, { busy: false, err: this.errText(e) }) });
        }
      };
      v.pcKey = e => { if (e.key === 'Enter') v.pcSubmit(); };
      return v;
    }
    if (!db.sites.length) return v;
    if (!me) return v;

    // common
    const near = this.nearest() || { site: null, dist: null }, site = near.site, radius = site ? site.radius : 10, dist = near.dist == null ? null : Math.round(near.dist), acc = geo.acc || 0;
    const geoOk = geo.state === 'ok';
    const tolOk = site && site.tolerance && acc <= 30 && near.dist - acc <= radius;
    const inRange = geoOk && (near.dist <= radius || tolOk);
    const todayKey = S.dayKey(now), myToday = this.dayPunches(me.id, todayKey);
    const last = myToday[myToday.length - 1], status = last && last.type === 'in' ? 'in' : 'out';
    const h = now.getHours();
    const isAdm = me.role === 'admin', isLead = me.role === 'leader', canManage = isAdm || isLead, exempt = !!me.noPunch;
    const roleName = r => r === 'admin' ? T.admin : r === 'leader' ? T.leader : T.roleEmp;
    v.myInit = this.init(me.name); v.myName = me.name; v.myId = me.id; v.isAdminUser = isAdm; v.canManage = canManage;
    v.myRoleName = roleName(me.role); v.openMgrLabel = isAdm ? T.openAdmin : T.openLead;
    v.exempt = exempt; v.notExempt = !exempt;
    v.myRoleLine = roleName(me.role) + ' · #' + me.id + (exempt ? ' · ' + T.exempt : '');
    if (st.screen === 'admin') { v.isAdmin = canManage; v.isApp = !canManage; }
    const mySite = this.mySite(); v.mySiteName = mySite ? mySite.name : '—'; v.mySiteRadius = mySite ? mySite.radius : '—';
    v.nearSiteName = site ? site.name : '—';
    v.goMe = () => this.setState({ screen: 'app', tab: 'me' });
    v.signOut = () => this.signOut();
    v.tabClock = st.tab === 'clock'; v.tabHistory = st.tab === 'history'; v.tabRequests = st.tab === 'requests'; v.tabMe = st.tab === 'me';
    const myPending = db.requests.filter(r => r.empId === me.id && r.status === 'pending').length;
    v.tabs = [['clock', T.tabClock], ['history', T.tabHistory], ['requests', T.tabRequests], ['me', T.tabMe]].filter(x => !(exempt && x[0] === 'history')).map(([k, label]) => ({ label, bg: st.tab === k ? '#fff' : 'transparent', fg: st.tab === k ? '#141A2A' : 'rgba(255,255,255,.7)', dot: k === 'requests' && myPending > 0 && st.tab !== k, go: () => this.setState({ tab: k }) }));

    // clock tab
    v.dateLabel = this.fmtD(now, { weekday: 'long', month: 'long', day: 'numeric' });
    v.greeting = (h < 12 ? T.morning : h < 18 ? T.afternoon : T.evening) + (L === 'zh' ? '，' : ', ') + me.name.split(' ')[0];
    v.geoOk = geoOk; v.geoDenied = geo.state === 'denied'; v.distance = dist == null ? '—' : dist; v.statusAnim = 'none';
    if (geo.state === 'locating') Object.assign(v, { statusBg: '#fff', statusDot: '#8A91A0', statusRing: '#F0F1F4', statusFg: '#141A2A', statusFg2: '#6B7280', statusTitle: T.locating, statusSub: T.locatingSub, statusAnim: 'ef-pulse 1.6s ease-in-out infinite' });
    else if (!geoOk) Object.assign(v, { statusBg: '#FDE9E7', statusDot: '#D9453B', statusRing: 'rgba(217,69,59,.18)', statusFg: '#8E2A22', statusFg2: '#A8463D', statusTitle: T.denied, statusSub: T.deniedSub });
    else if (inRange) Object.assign(v, { statusBg: '#E6F6EC', statusDot: '#2E9E5B', statusRing: 'rgba(46,158,91,.18)', statusFg: '#17603A', statusFg2: '#2F7A4F', statusTitle: this.t('onSite', { site: site.name }), statusSub: this.t('inRange', { d: dist, a: acc }) });
    else Object.assign(v, { statusBg: '#FDE9E7', statusDot: '#D9453B', statusRing: 'rgba(217,69,59,.18)', statusFg: '#8E2A22', statusFg2: '#A8463D', statusTitle: T.outRange, statusSub: this.t('outRangeSub', { site: site.name, d: dist, r: radius, a: acc }) });
    v.retryGeo = () => this.startGeo();
    v.outOfRange = geoOk && !inRange; v.poorAcc = geoOk && !inRange && acc > 30; T.poorAcc = this.t('poorAcc', { a: acc });
    v.zoneDiam = Math.max(36, Math.min(110, radius * 2.4)) + 'px'; v.youLeft = (38 + Math.min(dist || 0, 60) / 60 * 48) + '%';
    v.locked = !inRange; v.lockedLabel = geoOk ? T.lockedOut : T.lockedGps;
    v.clockStr = L === 'en' ? ((h % 12) || 12) + ':' + String(now.getMinutes()).padStart(2, '0') : String(h).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    v.ampm = L === 'en' ? (h < 12 ? 'AM' : 'PM') : ''; v.clockColor = inRange ? '#141A2A' : '#4B5563';
    const workedToday = this.workedMs(myToday, now);
    v.clockSub = !last ? T.shiftHint : status === 'in' ? this.t('clockedInAt', { t: this.fmtT(last.t), dur: this.fmtDur(workedToday) }) : this.t('clockedOutAt', { t: this.fmtT(last.t), dur: this.fmtDur(workedToday) });
    v.primaryLabel = status === 'in' ? T.clockOut : T.clockIn;
    if (inRange) Object.assign(v, { primaryBg: status === 'in' ? '#141A2A' : '#1F5FD6', primaryFg: '#fff', primaryShadow: status === 'in' ? '0 10px 24px rgba(20,26,42,.28)' : '0 10px 24px rgba(31,95,214,.32)' });
    else Object.assign(v, { primaryBg: '#E3E6EC', primaryFg: '#8A91A0', primaryShadow: 'none' });
    v.primaryAction = () => { if (!geoOk) return this.showToast(T.toastNoGps, '#E39B1C'); if (!inRange) return this.showToast(this.t('toastOutRange', { site: site.name, r: radius }), '#D9453B'); this.setState({ sheet: status === 'in' ? 'out' : 'in', sheetStep: 'confirm' }); };
    v.walkText = this.t('walkText', { site: site ? site.name : '', r: radius });
    v.goFixReq = () => this.setState({ screen: 'newreq', rq: { kind: 'fix', date: todayKey, punchType: status === 'in' ? 'out' : 'in', time: this.fmtT24(now), days: 1, reason: '' } });
    v.todayWorked = this.fmtDur(workedToday); v.noPunchToday = !myToday.length;
    v.todayPunches = myToday.map(p => ({ label: p.type === 'in' ? T.punchIn : T.punchOut, color: p.type === 'in' ? '#2E9E5B' : '#141A2A', meta: p.viaRequest ? T.viaFix : (db.sites.find(s => s.id === p.siteId) || {}).name + ' · ' + Math.round(p.dist) + ' m', time: this.fmtT(p.t) }));
    const yKey = S.dayKey(new Date(now.getTime() - 864e5)), yp = this.dayPunches(me.id, yKey);
    v.yRange = yp.length ? this.fmtT(yp[0].t) + ' → ' + (yp.length > 1 ? this.fmtT(yp[yp.length - 1].t) : '—') : T.noPunch; v.yTotal = yp.length ? this.fmtDur(this.workedMs(yp)) : '';

    // sheet
    v.sheetOpen = !!st.sheet; v.sheetConfirm = st.sheetStep === 'confirm'; v.sheetDone = st.sheetStep === 'done';
    v.sheetTitle = st.sheet === 'in' ? T.confirmIn : T.confirmOut; v.sheetBtn = st.sheet === 'in' ? T.clockIn : T.clockOut; v.sheetBtnBg = st.sheet === 'in' ? '#1F5FD6' : '#141A2A';
    v.nowStr = this.fmtT(now);
    v.closeSheet = () => { if (st.sheetStep === 'done') return; this.setState({ sheet: null }); };
    v.confirmPunch = () => { const p = { id: S.uid(), empId: me.id, siteId: site.id, type: st.sheet, t: new Date().toISOString(), dist: Math.round(near.dist * 10) / 10, acc, lat: geo.lat, lng: geo.lng }; const ndb = Object.assign({}, db, { punches: db.punches.concat(p) }); this.persist(ndb, [['punches', p]]); this.setState({ sheetStep: 'done' }); setTimeout(() => { this.setState({ sheet: null, sheetStep: 'confirm' }); this.showToast((st.sheet === 'in' ? T.doneIn : T.doneOut) + ' · ' + this.fmtT(p.t)); }, 1400); };
    v.doneTitle = st.sheet === 'in' ? T.doneIn : T.doneOut; v.doneSub = this.fmtT(now) + ' · ' + (site ? site.name : '') + ' · ' + dist + ' m';

    // history
    const dow = (now.getDay() + 6) % 7, weekStart = new Date(now); weekStart.setHours(0, 0, 0, 0); weekStart.setDate(weekStart.getDate() - dow);
    let wMs = 0, wDays = 0, wMiss = 0, inSum = 0, inN = 0; const days = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(now); d.setDate(d.getDate() - i); const key = S.dayKey(d), ps = this.dayPunches(me.id, key), isToday = i === 0, wknd = d.getDay() === 0 || d.getDay() === 6;
      if (wknd && !ps.length) continue;
      const ms = this.workedMs(ps, isToday ? now : null), open = ps.length && ps[ps.length - 1].type === 'in' && !isToday, none = !ps.length && !isToday && !exempt;
      if (d >= weekStart) { wMs += ms; if (ps.length) wDays++; if (open || none) wMiss++; const fi = ps.find(p => p.type === 'in'); if (fi) { const t = new Date(fi.t); inSum += t.getHours() * 60 + t.getMinutes(); inN++; } }
      const chips = ps.map(p => ({ text: this.t(p.type === 'in' ? 'inChip' : 'outChip', { t: this.fmtT(p.t) }), bg: p.viaRequest ? '#FFF4DF' : p.type === 'in' ? '#E6F6EC' : '#F0F1F4', fg: p.viaRequest ? '#8A5A0E' : p.type === 'in' ? '#17603A' : '#141A2A' }));
      if (open) chips.push({ text: T.missingOut, bg: '#FDE9E7', fg: '#8E2A22' }); if (none) chips.push({ text: T.noPunch, bg: '#FDE9E7', fg: '#8E2A22' }); if (isToday && !ps.length) chips.push({ text: T.notClockedIn, bg: '#F0F1F4', fg: '#6B7280' });
      days.push({ label: (isToday ? T.today + ' · ' : '') + this.fmtD(d), total: ps.length ? this.fmtDur(ms) : '—', totalFg: open || none ? '#8E2A22' : '#141A2A', chips });
    }
    v.days = days; v.weekTotal = this.fmtDur(wMs); v.weekDays = wDays; v.weekMissing = wMiss;
    v.weekAvgIn = inN ? this.fmtT(new Date(2000, 0, 1, 0, Math.round(inSum / inN))) : '—';
    v.missTileBg = wMiss ? '#FDE9E7' : '#fff'; v.missTileFg = wMiss ? '#8E2A22' : '#141A2A'; v.missTileFg2 = wMiss ? '#A8463D' : '#6B7280';

    // requests
    const badge = s => s === 'approved' ? { badge: T.approved, badgeBg: '#E6F6EC', badgeFg: '#17603A' } : s === 'denied' ? { badge: T.denied_, badgeBg: '#F0F1F4', badgeFg: '#6B7280' } : { badge: T.pending, badgeBg: '#FFF4DF', badgeFg: '#8A5A0E' };
    const reqDetail = r => r.kind === 'fix' ? this.t('fixDetail', { date: this.fmtD(this.dayFromKey(r.date)), pt: r.punchType === 'in' ? T.punchIn : T.punchOut, time: r.time }) : this.t('leaveDetail', { date: this.fmtD(this.dayFromKey(r.date)), n: r.days || 1, h: r.hours || 8, t: (r.days || 1) * (r.hours || 8) });
    const mine = db.requests.filter(r => r.empId === me.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    v.myReqs = mine.map(r => Object.assign({ title: r.kind === 'fix' ? T.fix : T.leave, detail: reqDetail(r), reason: r.reason }, badge(r.status))); v.noMyReqs = !mine.length;
    v.goNewReq = () => this.setState({ screen: 'newreq', rq: { kind: 'leave', date: todayKey, punchType: 'in', time: '08:30', days: 1, reason: '' } });
    v.goRequests = () => this.setState({ screen: 'app', tab: 'requests' });
    const rq = st.rq || { kind: 'leave', date: todayKey, punchType: 'in', time: '08:30', days: 1, reason: '' }; v.rq = rq;
    const setRq = patch => this.setState({ rq: Object.assign({}, rq, patch) });
    v.kindOpts = [['leave', T.leave], ['fix', T.fix]].map(([k, label]) => ({ label, bg: rq.kind === k ? '#fff' : 'transparent', fg: rq.kind === k ? '#141A2A' : '#6B7280', pick: () => setRq({ kind: k }) }));
    v.ptOpts = [['in', T.punchIn], ['out', T.punchOut]].map(([k, label]) => ({ label, bg: rq.punchType === k ? '#fff' : 'transparent', fg: rq.punchType === k ? '#141A2A' : '#6B7280', pick: () => setRq({ punchType: k }) }));
    v.rqIsFix = rq.kind === 'fix'; v.rqIsLeave = rq.kind === 'leave';
    v.setRqDate = e => setRq({ date: e.target.value }); v.setRqTime = e => setRq({ time: e.target.value }); v.setRqReason = e => setRq({ reason: e.target.value });
    v.rqDaysLess = () => setRq({ days: Math.max(1, rq.days - 1) }); v.rqDaysMore = () => setRq({ days: Math.min(30, rq.days + 1) });
    const rqH = rq.hours || 8;
    v.rqHoursLess = () => setRq({ hours: Math.max(1, rqH - 1) }); v.rqHoursMore = () => setRq({ hours: Math.min(12, rqH + 1) });
    v.rqHourPresets = [[4, T.halfDay], [8, T.fullDay]].map(([n, label]) => ({ label, bg: rqH === n ? '#fff' : 'transparent', fg: rqH === n ? '#141A2A' : '#6B7280', pick: () => setRq({ hours: n }) }));
    v.rqTotal = this.t('leaveTotal', { d: rq.days, h: rqH, t: rq.days * rqH });
    const rqEnd = this.dayFromKey(rq.date); rqEnd.setDate(rqEnd.getDate() + rq.days - 1); v.rqRange = rq.days > 1 ? this.fmtD(this.dayFromKey(rq.date), { month: 'short', day: 'numeric' }) + ' → ' + this.fmtD(rqEnd, { month: 'short', day: 'numeric' }) : '';
    const rqValid = rq.date && rq.reason.trim().length > 0 && (rq.kind === 'leave' || rq.time);
    v.rqSubmitBg = rqValid ? '#1F5FD6' : '#E3E6EC'; v.rqSubmitFg = rqValid ? '#fff' : '#8A91A0';
    v.submitReq = () => { if (!rqValid) return; const r = { id: S.uid(), empId: me.id, kind: rq.kind, date: rq.date, punchType: rq.kind === 'fix' ? rq.punchType : null, time: rq.kind === 'fix' ? rq.time : null, days: rq.kind === 'leave' ? rq.days : null, hours: rq.kind === 'leave' ? (rq.hours || 8) : null, reason: rq.reason.trim(), status: 'pending', createdAt: new Date().toISOString() }; this.persist(Object.assign({}, db, { requests: db.requests.concat(r) }), [['requests', r]]); this.setState({ screen: 'app', tab: 'requests', rq: null }); this.showToast(T.toastSent); };

    // me
    v.connFg = st.sbOn ? '#17603A' : '#8A5A0E'; v.connLabel = st.sbOn ? T.remote : T.local;
    v.goChangePin = () => this.setState({ screen: 'setpin', pc: { old: '', a: '', b: '', err: '', forced: false } });
    v.goAdmin = () => this.setState({ screen: 'admin', mTab: 'today', se: null, ee: null });

    // ---- admin
    if (st.screen !== 'admin' || !canManage) return v;
    // Main admin sees everyone; a team lead sees only the employees assigned to them.
    const scopeEmps = isAdm ? db.employees : db.employees.filter(e => e.leaderId === me.id);
    const scopeIds = {}; scopeEmps.forEach(e => { scopeIds[e.id] = true; });
    const tracked = scopeEmps.filter(e => !e.noPunch);
    v.noScope = !scopeEmps.length; v.isLeadView = !isAdm;
    const empName = id => (db.employees.find(e => e.id === id) || {}).name || '';
    const pendingAll = db.requests.filter(r => r.status === 'pending' && scopeIds[r.empId]).length;
    const mt = (!isAdm && (st.mTab === 'sites' || st.mTab === 'team')) ? 'today' : st.mTab; v.mToday = mt === 'today'; v.mAtt = mt === 'att'; v.mReq = mt === 'req'; v.mSites = mt === 'sites'; v.mTeam = mt === 'team';
    v.mTabs = [['today', T.mToday], ['att', T.mAtt], ['req', T.mReq], ['sites', T.mSites], ['team', T.mTeam]].filter(x => isAdm || (x[0] !== 'sites' && x[0] !== 'team')).map(([k, label]) => ({ label: k === 'req' && pendingAll ? label + ' · ' + pendingAll : label, bg: mt === k ? '#fff' : 'transparent', fg: mt === k ? '#0F1B3D' : 'rgba(255,255,255,.75)', go: () => this.setState({ mTab: k, se: null, ee: null }) }));
    v.mTitle = { today: T.mToday, att: T.mAtt, req: T.mReq, sites: T.mSites, team: T.mTeam }[mt];
    v.mBadge = pendingAll ? pendingAll + ' ' + T.pending : this.fmtD(now, { month: 'short', day: 'numeric' }); v.mBadgeBg = pendingAll ? '#E39B1C' : '#58B4EA';
    const siteName = id => (db.sites.find(s => s.id === id) || {}).name || '—';

    // today
    let on = 0, left = 0, off = 0;
    v.roster = tracked.map(e => {
      const ps = this.dayPunches(e.id, todayKey), l = ps[ps.length - 1];
      const stt = !l ? 'off' : l.type === 'in' ? 'in' : 'left'; if (stt === 'in') on++; else if (stt === 'left') left++; else off++;
      return { init: this.init(e.name), name: e.name, sub: '#' + e.id + ' · ' + siteName(e.siteId), dot: stt === 'in' ? '#2E9E5B' : stt === 'left' ? '#1F5FD6' : '#C6CAD2', fg: stt === 'in' ? '#17603A' : stt === 'left' ? '#1747A6' : '#8A91A0', state: stt === 'in' ? T.working : stt === 'left' ? T.left : T.off, since: l ? this.t(stt === 'in' ? 'since' : 'leftAt', { t: this.fmtT(l.t) }) : '' };
    }).sort((a, b) => (a.state === T.working ? 0 : a.state === T.left ? 1 : 2) - (b.state === T.working ? 0 : b.state === T.left ? 1 : 2));
    v.teamOn = on; v.teamLeft = left; v.teamOff = off;

    // attendance
    const ak = st.attDate || todayKey, ad = this.dayFromKey(ak); let present = 0, miss = 0;
    v.attLabel = (ak === todayKey ? T.today + ' · ' : '') + this.fmtD(ad);
    v.attRows = tracked.map(e => { const ps = this.dayPunches(e.id, ak), i = ps.find(p => p.type === 'in'), o = [...ps].reverse().find(p => p.type === 'out'); if (ps.length) present++; const bad = !ps.length || (i && !o && ak !== todayKey); if (bad) miss++; return { name: e.name, site: ps.length ? siteName(ps[0].siteId) : siteName(e.siteId), in: i ? this.fmtT(i.t) : '—', out: o ? this.fmtT(o.t) : '—', inFg: i ? '#141A2A' : '#C6CAD2', outFg: o ? '#141A2A' : (i && ak !== todayKey ? '#D9453B' : '#C6CAD2'), hours: ps.length ? this.fmtDur(this.workedMs(ps, ak === todayKey ? now : null)) : '—', hFg: bad ? '#8E2A22' : '#141A2A' }; });
    v.attSummary = this.t('attSummary', { n: present, m: miss });
    v.attPrev = () => { const d = new Date(ad); d.setDate(d.getDate() - 1); this.setState({ attDate: S.dayKey(d) }); };
    v.attNext = () => { const d = new Date(ad); d.setDate(d.getDate() + 1); if (S.dayKey(d) <= todayKey) this.setState({ attDate: S.dayKey(d) }); };
    v.exportDay = () => this.download('attendance-' + ak + '.csv', this.csvFor([ak], tracked));
    v.exportMonth = () => { const keys = []; const d = new Date(ad.getFullYear(), ad.getMonth(), 1); while (d.getMonth() === ad.getMonth() && S.dayKey(d) <= todayKey) { keys.push(S.dayKey(d)); d.setDate(d.getDate() + 1); } this.download('attendance-' + ak.slice(0, 7) + '.csv', this.csvFor(keys, tracked)); };

    // approvals
    const all = db.requests.filter(r => scopeIds[r.empId]).sort((a, b) => (a.status === 'pending' ? 0 : 1) - (b.status === 'pending' ? 0 : 1) || b.createdAt.localeCompare(a.createdAt));
    const decide = (r, status) => {
      const requests = db.requests.map(x => x.id === r.id ? Object.assign({}, x, { status }) : x), changes = [['requests', requests.find(x => x.id === r.id)]]; let punches = db.punches;
      if (status === 'approved' && r.kind === 'fix') { const emp = db.employees.find(e => e.id === r.empId); const [hh, mm] = r.time.split(':').map(Number); const t = this.dayFromKey(r.date); t.setHours(hh, mm, 0, 0); const p = { id: S.uid(), empId: r.empId, siteId: emp ? emp.siteId : db.sites[0].id, type: r.punchType, t: t.toISOString(), dist: 0, acc: 0, viaRequest: r.id }; punches = punches.concat(p); changes.push(['punches', p]); }
      this.persist(Object.assign({}, db, { requests, punches }), changes); this.showToast(status === 'approved' ? T.toastApproved : T.toastDenied, status === 'approved' ? '#2E9E5B' : '#8A91A0');
    };
    v.allReqs = all.map(r => { const e = db.employees.find(x => x.id === r.empId) || { name: r.empId }; return Object.assign({ init: this.init(e.name), who: e.name, title: (r.kind === 'fix' ? T.fix : T.leave) + ' · ' + this.fmtD(r.createdAt, { month: 'short', day: 'numeric' }), detail: reqDetail(r), reason: r.reason, pending: r.status === 'pending' && isAdm, opacity: r.status === 'pending' ? 1 : .6, approve: () => decide(r, 'approved'), deny: () => decide(r, 'denied') }, badge(r.status)); });
    v.noAllReqs = !all.length;

    // sites
    const se = st.se; v.siteListMode = !se; v.siteEditMode = !!se;
    v.siteRows = db.sites.map(s => ({ name: s.name, sub: this.t('employees_', { n: db.employees.filter(e => e.siteId === s.id).length }) + ' · ' + s.address, radius: s.radius, edit: () => this.setState({ se: Object.assign({}, s), seHere: '' }) }));
    v.newSite = () => this.setState({ se: { id: S.uid(), name: '', address: '', lat: site ? site.lat : 0, lng: site ? site.lng : 0, radius: 10, tolerance: true, isNew: true }, seHere: '' });
    if (se) {
      const setSe = patch => this.setState({ se: Object.assign({}, se, patch) });
      v.se = se; v.seDiam = Math.max(36, Math.min(150, se.radius * 2.4)) + 'px';
      v.setSeName = e => setSe({ name: e.target.value }); v.setSeAddress = e => setSe({ address: e.target.value });
      v.setSeLat = e => setSe({ lat: parseFloat(e.target.value) || 0 }); v.setSeLng = e => setSe({ lng: parseFloat(e.target.value) || 0 });
      v.setSeRadius = e => setSe({ radius: Math.max(1, Math.min(500, parseInt(e.target.value, 10) || 1)) });
      v.seToggleTol = () => setSe({ tolerance: !se.tolerance }); v.seTolBg = se.tolerance ? '#1F5FD6' : '#C6CAD2'; v.seTolKnob = se.tolerance ? '23px' : '3px';
      v.seHereLabel = st.seHere === 'busy' ? T.useHereBusy : st.seHere ? st.seHere : T.useHere;
      v.seUseHere = () => { if (geo.state === 'ok' && this.mode() !== 'real') return setSe({ lat: geo.lat, lng: geo.lng }); if (!navigator.geolocation) return; this.setState({ seHere: 'busy' }); navigator.geolocation.getCurrentPosition(p => { this.setState({ se: Object.assign({}, this.state.se, { lat: +p.coords.latitude.toFixed(7), lng: +p.coords.longitude.toFixed(7) }), seHere: this.t('useHereDone', { a: Math.round(p.coords.accuracy) }) }); }, () => this.setState({ seHere: T.denied }), { enableHighAccuracy: true, timeout: 15000 }); };
      const used = db.employees.some(e => e.siteId === se.id); v.seCanDelete = !se.isNew && db.sites.length > 1;
      v.seDelete = () => { if (used) return this.showToast(T.siteInUse, '#D9453B'); this.persist(Object.assign({}, db, { sites: db.sites.filter(s => s.id !== se.id) }), [['sites', se.id, true]]); this.setState({ se: null }); };
      v.seSave = () => { if (!se.name.trim()) return; const row = { id: se.id, name: se.name.trim(), address: se.address, lat: se.lat, lng: se.lng, radius: se.radius, tolerance: !!se.tolerance }; const sites = se.isNew ? db.sites.concat(row) : db.sites.map(s => s.id === se.id ? row : s); this.persist(Object.assign({}, db, { sites }), [['sites', row]]); this.setState({ se: null }); this.showToast(T.saved); };
      v.siteBack = () => this.setState({ se: null });
    }

    // team
    const ee = st.ee; v.empListMode = !ee; v.empEditMode = !!ee; v.empCountText = this.t('employees_', { n: db.employees.length });
    const membersOf = id => db.employees.filter(x => x.leaderId === id);
    const rank = r => r === 'admin' ? 0 : r === 'leader' ? 1 : 2;
    v.empRows = [...db.employees].sort((a, b) => rank(a.role) - rank(b.role) || a.id.localeCompare(b.id, undefined, { numeric: true })).map(e => ({
      id: e.id, name: e.name, init: this.init(e.name),
      sub: '#' + e.id + ' · ' + (e.role === 'leader' ? this.t('membersCount', { n: membersOf(e.id).length }) : siteName(e.siteId)) + (e.role === 'employee' && e.leaderId && empName(e.leaderId) ? ' · ' + this.t('leadLine', { n: empName(e.leaderId) }) : '') + (e.noPunch ? ' · ' + T.exempt : '') + (e.hasPin === false ? ' · ' + T.noPinYet : ''),
      badge: e.role === 'admin' ? T.admin : e.role === 'leader' ? T.leader : '', badgeBg: e.role === 'admin' ? '#58B4EA' : '#FFE1A8',
      edit: () => this.setState({ ee: Object.assign({}, e, { members: membersOf(e.id).map(x => x.id) }), eeErr: '' }) }));
    v.newEmp = () => this.setState({ ee: { id: '', name: '', role: 'employee', siteId: db.sites[0].id, leaderId: null, noPunch: false, members: [], isNew: true }, eeErr: '' });
    if (ee) {
      const setEe = patch => this.setState({ ee: Object.assign({}, ee, patch), eeErr: '' });
      v.ee = ee; v.eeErr = st.eeErr; v.empEditTitle = ee.isNew ? T.newEmployee : T.editEmployee; v.eeIdLocked = !ee.isNew; v.eeIdFg = ee.isNew ? '#141A2A' : '#8A91A0';
      v.setEeName = e => setEe({ name: e.target.value }); v.setEeId = e => setEe({ id: e.target.value.replace(/\s/g, '') });
      // PIN: required for a new person; for an existing one it resets their PIN. (Your own PIN is changed from "Me".)
      v.eeShowPin = ee.isNew || ee.id !== me.id; v.eePinLabel = ee.isNew ? T.pinInitial : T.pinReset; v.eePin = ee.pin || '';
      v.eePinRule = this.t('pinRule', { n: ee.role === 'employee' ? 4 : 6 }); v.setEePin = e => setEe({ pin: e.target.value.replace(/\s/g, '') });
      v.roleOpts = [['employee', T.roleEmp], ['leader', T.leader], ['admin', T.admin]].map(([k, label]) => ({ label, bg: ee.role === k ? '#fff' : 'transparent', fg: ee.role === k ? '#141A2A' : '#6B7280', pick: () => setEe({ role: k }) }));
      v.eeSiteChips = db.sites.map(s => ({ label: s.name, bg: ee.siteId === s.id ? '#DCE7FB' : '#fff', fg: ee.siteId === s.id ? '#1747A6' : '#141A2A', border: ee.siteId === s.id ? '#1F5FD6' : '#E3E6EC', pick: () => setEe({ siteId: s.id }) }));
      // Employee -> which team lead they report to
      v.eeIsEmp = ee.role === 'employee'; v.eeIsLead = ee.role === 'leader'; v.eeCanExempt = ee.role !== 'employee';
      const chip = (label, on, pick) => ({ label, bg: on ? '#DCE7FB' : '#fff', fg: on ? '#1747A6' : '#141A2A', border: on ? '#1F5FD6' : '#E3E6EC', pick });
      v.eeLeaderChips = [chip(T.noLeader, !ee.leaderId, () => setEe({ leaderId: null }))].concat(db.employees.filter(e => e.role === 'leader' && e.id !== ee.id).map(e => chip(e.name, ee.leaderId === e.id, () => setEe({ leaderId: e.id }))));
      // Team lead -> which employees are on their team
      const mem = ee.members || [], assignable = db.employees.filter(e => e.role === 'employee' && e.id !== ee.id);
      v.eeMemberChips = assignable.map(e => { const on = mem.indexOf(e.id) >= 0, other = !on && e.leaderId && e.leaderId !== ee.id ? empName(e.leaderId) : ''; return chip(e.name + (other ? ' · ' + this.t('leadLine', { n: other }) : ''), on, () => setEe({ members: on ? mem.filter(x => x !== e.id) : mem.concat(e.id) })); });
      v.eeNoAssignable = !assignable.length;
      v.eeToggleExempt = () => setEe({ noPunch: !ee.noPunch }); v.eeExBg = ee.noPunch ? '#1F5FD6' : '#C6CAD2'; v.eeExKnob = ee.noPunch ? '23px' : '3px';
      v.eeCanDelete = !ee.isNew && ee.id !== me.id;
      v.eeDelete = () => { const changes = [['employees', ee.id, true]]; const employees = db.employees.filter(e => e.id !== ee.id).map(e => { if (e.leaderId !== ee.id) return e; const n = Object.assign({}, e, { leaderId: null }); changes.push(['employees', n]); return n; }); this.persist(Object.assign({}, db, { employees }), changes); this.setState({ ee: null }); };
      v.eeSave = () => {
        if (!ee.name.trim() || !ee.id) return this.setState({ eeErr: T.needFields });
        if (ee.isNew && db.employees.some(e => e.id === ee.id)) return this.setState({ eeErr: T.idTaken });
        const newPin = v.eeShowPin ? (ee.pin || '') : '';
        if (ee.isNew && !newPin) return this.setState({ eeErr: T.pinNeed });
        if (newPin && newPin.length < (ee.role === 'employee' ? 4 : 6)) return this.setState({ eeErr: v.eePinRule });
        const row = { id: ee.id, name: ee.name.trim(), role: ee.role, siteId: ee.siteId, leaderId: ee.role === 'employee' ? (ee.leaderId || null) : null, noPunch: ee.role !== 'employee' && !!ee.noPunch };
        const changes = [['employees', row]], team = ee.role === 'leader' ? mem : [];
        const employees = (ee.isNew ? db.employees.concat(row) : db.employees.map(e => e.id === ee.id ? row : e)).map(e => {
          if (e.id === row.id) return e;
          let lid = e.leaderId || null;
          if (team.indexOf(e.id) >= 0 && e.role === 'employee') lid = row.id; else if (lid === row.id) lid = null;
          if (lid === (e.leaderId || null)) return e;
          const n = Object.assign({}, e, { leaderId: lid }); changes.push(['employees', n]); return n;
        });
        if (!employees.some(e => e.role === 'admin')) return this.setState({ eeErr: T.lastAdmin });
        this.persist(Object.assign({}, db, { employees }), changes);
        const ns = { ee: null }; if (row.id === me.id) ns.me = row; this.setState(ns); this.showToast(T.saved);
        // The PIN is never stored on this phone: it is sent straight to the server once the employee record is saved there.
        if (newPin) this.flush().then(ok => { if (!ok) throw new Error('offline'); return this.remote.setPin(row.id, newPin); }).then(() => { this.showToast(T.pinSetOk); this.refreshRemote(); }).catch(e => this.showToast(e && e.code === 'EF_PIN_WEAK' ? T.pinWeak : T.pinSetFail, '#D9453B'));
      };
      v.empBack = () => this.setState({ ee: null });
    }
    return v;
  }
  fmtT24(d) { return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
}
