<!--panel-vet.html-->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Paws — Panel Veterinario</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <link rel="stylesheet" href="css/style.css">
  <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js'></script>
  <style>
    #calendario {
      max-width: 100%;
      margin: 20px auto;
      background: white;
      padding: 15px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .fc .fc-view-harness { height: 500px !important; }

    /* ── INVENTARIO STYLES ───────────────────── */
    .inv-header {
      display:flex; align-items:center; justify-content:space-between;
      flex-wrap:wrap; gap:14px; margin-bottom:20px;
    }
    .inv-search {
      display:flex; gap:8px; align-items:center;
    }
    .inv-search input {
      border:1.5px solid var(--arena); border-radius:999px;
      padding:8px 16px; font-size:.84rem;
      font-family:'DM Sans',sans-serif; outline:none;
      background:var(--crema); width:200px; transition:var(--transicion);
    }
    .inv-search input:focus { border-color:var(--verde-vivo); background:#fff; }
    .inv-search select {
      border:1.5px solid var(--arena); border-radius:999px;
      padding:8px 14px; font-size:.84rem;
      font-family:'DM Sans',sans-serif; outline:none;
      background:var(--crema); cursor:pointer;
    }

    /* Stats inventario */
    .inv-stats {
      display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
      gap:14px; margin-bottom:24px;
    }
    .inv-stat {
      background:var(--blanco); border-radius:var(--radio-md);
      padding:18px 20px; box-shadow:var(--sombra-sm);
      border-left:4px solid var(--verde-vivo);
    }
    .inv-stat.ambar  { border-color:var(--ambar); }
    .inv-stat.coral  { border-color:var(--coral); }
    .inv-stat.azul   { border-color:#3b82f6; }
    .inv-stat .ist-valor { font-size:1.6rem; font-weight:900; color:var(--verde-oscuro); }
    .inv-stat .ist-label { font-size:.75rem; color:var(--texto-suave); margin-top:2px; }

    /* Tabla */
    .inv-table-wrap {
      overflow-x:auto; border-radius:var(--radio-md);
      box-shadow:var(--sombra-sm);
    }
    .inv-table {
      width:100%; border-collapse:collapse;
      background:var(--blanco); font-size:.84rem;
    }
    .inv-table thead tr {
      background:var(--verde-oscuro); color:var(--blanco);
    }
    .inv-table th {
      padding:13px 16px; text-align:left;
      font-weight:700; font-size:.76rem;
      letter-spacing:.8px; text-transform:uppercase;
      white-space:nowrap;
    }
    .inv-table td {
      padding:12px 16px; border-bottom:1px solid var(--arena);
      vertical-align:middle;
    }
    .inv-table tbody tr:last-child td { border-bottom:none; }
    .inv-table tbody tr:hover { background:var(--crema); }

    /* Stock badge inline */
    .stock-pill {
      display:inline-flex; align-items:center; gap:5px;
      padding:4px 10px; border-radius:999px;
      font-size:.75rem; font-weight:700;
    }
    .stock-ok   { background:#e8f8f0; color:#1e7a4a; }
    .stock-low  { background:#fff4e0; color:#b76e00; }
    .stock-out  { background:#fdecea; color:#c0392b; }

    /* Editar stock inline */
    .stock-edit-wrap { display:flex; align-items:center; gap:8px; }
    .btn-edit-stock {
      background:none; border:none; color:var(--verde-vivo);
      cursor:pointer; font-size:.85rem; padding:4px;
      transition:var(--transicion); border-radius:4px;
    }
    .btn-edit-stock:hover { background:var(--verde-claro); }
    .stock-input {
      width:64px; border:1.5px solid var(--verde-vivo);
      border-radius:6px; padding:4px 8px; font-size:.84rem;
      font-family:'DM Sans',sans-serif; display:none;
    }
    .btn-save-stock {
      display:none; background:var(--verde-vivo); color:#fff;
      border:none; border-radius:6px; padding:4px 10px;
      font-size:.78rem; font-weight:700; cursor:pointer;
    }

    /* Sin datos */
    .inv-empty {
      text-align:center; padding:48px 0; color:var(--texto-suave);
    }
    .inv-empty i { font-size:2.4rem; opacity:.25; display:block; margin-bottom:12px; }

    /* Toast panel */
    .panel-toast {
      position:fixed; bottom:28px; left:50%;
      transform:translateX(-50%) translateY(10px);
      background:var(--verde-oscuro); color:#fff;
      padding:10px 22px; border-radius:999px;
      font-size:.84rem; font-weight:600;
      box-shadow:var(--sombra-md); z-index:999;
      opacity:0; pointer-events:none; transition:.3s ease;
    }
    .panel-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
  </style>
</head>
<body>

<div class="vet-page">

  <!-- SIDEBAR -->
  <aside class="sidebar" id="sidebar">
    <div class="vet-info">
      <img src="img/veterinaria.png" alt="Doctor" class="avatar">
      <h3>Dr. Veterinario</h3>
      <span class="sidebar-tag">Veterinario</span>
    </div>
    <nav class="side-nav">
      <a href="#" onclick="window.scrollTo({top:0, behavior:'smooth'})" class="active">
        <i class="fas fa-home"></i> Panel principal
      </a>
      <a href="#buscar-section">
        <i class="fas fa-search"></i> Buscar paciente
      </a>
      <a href="#calendario-section">
        <i class="fas fa-calendar-alt"></i> Citas del día
      </a>
      <a href="atenciones.html">
        <i class="fas fa-notes-medical"></i> Atenciones
      </a>
      <a href="registrar_cliente.html">
        <i class="fas fa-user-plus"></i> Registrar dueño
      </a>
      <a href="registrar_mascota.html">
        <i class="fas fa-paw"></i> Registrar mascota
      </a>
      <!-- ✅ ACTUALIZADO: apunta a la sección real -->
      <a href="#inventario-section">
        <i class="fas fa-boxes"></i> Inventario tienda
      </a>
      <a href="login.html" class="logout">
        <i class="fas fa-sign-out-alt"></i> Cerrar sesión
      </a>
    </nav>
  </aside>

  <!-- CONTENIDO PRINCIPAL -->
  <main class="main-content">

    <div class="content-header">
      <div style="display:flex;align-items:center;gap:14px;">
        <button id="menu-toggle" class="menu-toggle">
          <i class="fas fa-bars"></i>
        </button>
        <div>
          <h1>Panel Principal</h1>
          <p style="font-size:.8rem;color:var(--texto-suave);margin-top:2px;">
            Bienvenido de vuelta, Dr. Veterinario
          </p>
        </div>
      </div>
      <span class="header-date" id="fecha-hoy"></span>
    </div>

    <!-- CALENDARIO -->
    <div class="block" id="calendario-section">
      <h3>
        <i class="fas fa-calendar-alt" style="color:var(--verde-vivo)"></i>
        Calendario de citas
      </h3>
      <div id="calendario">
        <p style="color:var(--texto-suave);font-size:.9rem;">
          Aquí se mostrará el calendario de citas.
        </p>
      </div>
    </div>

    <!-- STATS -->
    <div class="stats-row">
      <div class="stat-card verde">
        <div class="stat-card-icon"><i class="fas fa-paw"></i></div>
        <div class="stat-num">12</div>
        <div class="stat-label">Mascotas hoy</div>
        <span class="stat-change up"><i class="fas fa-arrow-up"></i> +3 vs ayer</span>
      </div>
      <div class="stat-card ambar">
        <div class="stat-card-icon"><i class="fas fa-calendar-check"></i></div>
        <div class="stat-num">5</div>
        <div class="stat-label">Citas pendientes</div>
        <span class="stat-change neutral">Próxima: 10:00 AM</span>
      </div>
      <div class="stat-card azul">
        <div class="stat-card-icon"><i class="fas fa-users"></i></div>
        <div class="stat-num">148</div>
        <div class="stat-label">Clientes registrados</div>
        <span class="stat-change up"><i class="fas fa-arrow-up"></i> +2 esta semana</span>
      </div>
      <div class="stat-card coral">
        <div class="stat-card-icon"><i class="fas fa-exclamation-triangle"></i></div>
        <div class="stat-num">3</div>
        <div class="stat-label">Vacunas pendientes</div>
        <span class="stat-change neutral">Revisar hoy</span>
      </div>
    </div>

    <!-- GRID -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">
      <div class="card">
        <h3><i class="fas fa-clock" style="color:var(--ambar)"></i> Próximas Citas</h3>
        <div class="mascota-item">
          <div>
            <span style="font-weight:700;">3:30 PM</span> — Coco
            <span class="status-badge pendiente" style="margin-left:8px;">Consulta</span>
          </div>
          <span style="font-size:.8rem;color:var(--texto-suave);">Loro amazónico</span>
        </div>
      </div>
      <div class="card">
        <h3><i class="fas fa-bell" style="color:var(--ambar)"></i> Notificaciones</h3>
        <div class="mascota-item">
          <span>📅 5 citas agendadas para hoy</span>
          <span class="status-badge pendiente">Hoy</span>
        </div>
        <div class="mascota-item" id="notif-stock">
          <!-- Se llenará desde inventario.js si hay stock bajo -->
        </div>
      </div>
    </div>

    <!-- MASCOTAS -->
    <div class="block">
      <h3>
        <i class="fas fa-paw" style="color:var(--verde-vivo)"></i>
        Mascotas registradas recientemente
      </h3>
      <div id="lista-mascotas">
        <p style="color:var(--texto-suave);font-size:.88rem;">Cargando mascotas...</p>
      </div>
    </div>

    <!-- BUSCADOR -->
    <div class="search-section" id="buscar-section">
      <h3>
        <i class="fas fa-search" style="color:var(--verde-vivo);margin-right:6px;"></i>
        Buscar por Carnet del Dueño
      </h3>
      <div class="search-box">
        <input type="number" id="busca-ci" placeholder="Ingrese el CI del dueño...">
        <button onclick="buscarPacientes()">
          <i class="fas fa-search"></i> Consultar
        </button>
      </div>
      <div id="resultado-busqueda"></div>
    </div>

    <!-- ══════════════════════════════════════════════
         ✅ SECCIÓN INVENTARIO — NUEVA
         ══════════════════════════════════════════════ -->
    <div class="block" id="inventario-section">

      <div class="inv-header">
        <h3 style="margin:0;">
          <i class="fas fa-boxes" style="color:var(--verde-vivo);margin-right:8px;"></i>
          Inventario de la Tienda
        </h3>
        <div class="inv-search">
          <input type="text" id="inv-buscar" placeholder="🔍 Buscar producto…">
          <select id="inv-filtro-cat">
            <option value="">Todas las categorías</option>
            <option value="Alimento">Alimento</option>
            <option value="Higiene">Higiene</option>
            <option value="Juguetes">Juguetes</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Camas">Camas</option>
          </select>
        </div>
      </div>

      <!-- Mini stats del inventario -->
      <div class="inv-stats" id="inv-stats">
        <div class="inv-stat">
          <div class="ist-valor" id="ist-total">—</div>
          <div class="ist-label">Productos en catálogo</div>
        </div>
        <div class="inv-stat ambar">
          <div class="ist-valor" id="ist-bajos">—</div>
          <div class="ist-label">Stock bajo (≤5)</div>
        </div>
        <div class="inv-stat coral">
          <div class="ist-valor" id="ist-agotados">—</div>
          <div class="ist-label">Agotados</div>
        </div>
        <div class="inv-stat azul">
          <div class="ist-valor" id="ist-ingresos">—</div>
          <div class="ist-label">Ingresos por ventas</div>
        </div>
      </div>

      <!-- Tabla -->
      <div class="inv-table-wrap">
        <table class="inv-table" id="inv-tabla">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Vendidos</th>
              <th>Ingresos</th>
              <th>Ajustar stock</th>
            </tr>
          </thead>
          <tbody id="inv-tbody">
            <tr>
              <td colspan="8" style="text-align:center;padding:32px;color:var(--texto-suave);">
                <i class="fas fa-spinner fa-spin"></i> Cargando inventario…
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    <!-- FIN INVENTARIO -->

  </main>
</div>

<!-- Toast -->
<div class="panel-toast" id="panel-toast"></div>

<script src="js/atenciones.js"></script>
<script src="js/panel-vet.js"></script>
<script src="js/inventario.js"></script>

<script>
  const toggleBtn = document.getElementById('menu-toggle');
  const sidebar   = document.getElementById('sidebar');

  toggleBtn.addEventListener('click', () => sidebar.classList.toggle('active'));

  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target))
      sidebar.classList.remove('active');
  });

  document.querySelectorAll('.side-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) sidebar.classList.remove('active');
    });
  });

  const fechaEl = document.getElementById('fecha-hoy');
  if (fechaEl) {
    fechaEl.textContent = new Date().toLocaleDateString('es-BO', {
      weekday:'long', year:'numeric', month:'long', day:'numeric'
    });
  }
</script>

</body>
</html>
