/*
 * Script generador de las diapositivas (.pptx) "Componentes PrimeFaces - VillamilWebUD".
 * Autor: David Villamil — Programación Avanzada — Grupo 31 — UD — 2026
 *
 * Ejecución:
 *   cd <ruta del proyecto>
 *   NODE_PATH="<ruta global de node_modules>" node docs/generar_diapositivas_primefaces.js
 *
 * Salida:
 *   docs/PrimeFaces_VillamilWebUD.pptx
 */
const pptxgen = require("pptxgenjs");
const path = require("path");

// ----------------------------------------------------------------------
// Paleta y tipografía
// ----------------------------------------------------------------------
const NAVY    = "092B5A";
const TEAL    = "09738A";
const SAGE    = "78A890";
const CREAM   = "E7D9B4";
const BG      = "F8F9FA";
const TEXT    = "1A1A1A";
const MUTED   = "6C757D";
const CODE_BG = "0E1F38";
const CODE_FG = "F5F5F5";
const WHITE   = "FFFFFF";

const HEAD_FONT = "Calibri";
const BODY_FONT = "Calibri";
const MONO_FONT = "Consolas";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";   // 10" × 5.625"
pres.author = "David Villamil";
pres.title = "Componentes de PrimeFaces aplicados al proyecto VillamilWebUD";
pres.subject = "Programación Avanzada — Universidad Distrital — 2026";

// ----------------------------------------------------------------------
// Helpers visuales
// ----------------------------------------------------------------------
function bandaSuperior(slide, color = NAVY) {
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.05, fill: { color }, line: { color, width: 0 } });
}

function pieDePagina(slide, numero, total) {
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: NAVY }, line: { color: NAVY, width: 0 } });
    slide.addText("VillamilWebUD · PrimeFaces · David Villamil",
        { x: 0.3, y: 5.45, w: 7, h: 0.18, fontSize: 9, color: WHITE, fontFace: BODY_FONT, valign: "middle", margin: 0 });
    slide.addText(`${numero} / ${total}`,
        { x: 8.7, y: 5.45, w: 1, h: 0.18, fontSize: 9, color: WHITE, fontFace: BODY_FONT, align: "right", valign: "middle", margin: 0 });
}

function tituloSlide(slide, texto, subtitulo) {
    slide.addText(texto, {
        x: 0.4, y: 0.25, w: 9.2, h: 0.55,
        fontSize: 30, bold: true, color: NAVY, fontFace: HEAD_FONT, margin: 0,
    });
    if (subtitulo) {
        slide.addText(subtitulo, {
            x: 0.4, y: 0.78, w: 9.2, h: 0.3,
            fontSize: 13, italic: true, color: MUTED, fontFace: BODY_FONT, margin: 0,
        });
    }
    slide.addShape(pres.shapes.RECTANGLE, {
        x: 0.4, y: 1.13, w: 0.45, h: 0.05,
        fill: { color: TEAL }, line: { color: TEAL, width: 0 },
    });
}

function bloqueCodigo(slide, lineas, opts) {
    const { x, y, w, h, size = 10 } = opts;
    slide.addShape(pres.shapes.RECTANGLE, {
        x, y, w, h,
        fill: { color: CODE_BG }, line: { color: CODE_BG, width: 0 },
    });
    const texto = lineas.map((l, i) => ({
        text: l || " ",
        options: { breakLine: i < lineas.length - 1 },
    }));
    slide.addText(texto, {
        x: x + 0.1, y: y + 0.08, w: w - 0.2, h: h - 0.16,
        fontSize: size, fontFace: MONO_FONT, color: CODE_FG, valign: "top", margin: 0,
    });
}

function tablaAtributos(slide, filas, opts) {
    const { x, y, w, h } = opts;
    const rows = [
        [
            { text: "Atributo", options: { bold: true, color: WHITE, fill: { color: NAVY }, fontFace: BODY_FONT, fontSize: 11, valign: "middle" } },
            { text: "Descripción",  options: { bold: true, color: WHITE, fill: { color: NAVY }, fontFace: BODY_FONT, fontSize: 11, valign: "middle" } },
        ],
        ...filas.map((f, i) => [
            { text: f[0], options: { fontFace: MONO_FONT, fontSize: 10, color: TEAL, fill: { color: i % 2 === 0 ? WHITE : BG }, valign: "middle" } },
            { text: f[1], options: { fontFace: BODY_FONT, fontSize: 10, color: TEXT, fill: { color: i % 2 === 0 ? WHITE : BG }, valign: "middle" } },
        ]),
    ];
    slide.addTable(rows, {
        x, y, w, h,
        colW: [w * 0.32, w * 0.68],
        border: { type: "solid", pt: 0.5, color: "DDDDDD" },
        margin: 0.05,
    });
}

// ----------------------------------------------------------------------
// Datos
// ----------------------------------------------------------------------
const COMPONENTES = [
    {
        nombre: "p:menubar",
        descripcion: "Barra de menú horizontal para la navegación principal del sitio. Soporta enlaces, acciones, sub-menús, iconos PrimeIcons y un área a la derecha para logo o acciones del usuario.",
        atributos: [
            ["model",      "Modelo de menú generado en el bean (alternativa a items declarativos)."],
            ["styleClass", "Clase CSS adicional sobre el elemento raíz."],
            ["autoDisplay","true: los submenús se abren al pasar el mouse (por defecto)."],
            ["tabindex",   "Posición de tabulación para accesibilidad."],
            ["widgetVar",  "Nombre JavaScript para controlar el menú desde el cliente."],
        ],
        codigo: [
            `<p:menubar styleClass="ud-menubar">`,
            `  <p:menuitem value="Inicio"`,
            `              url="index.xhtml"`,
            `              icon="pi pi-home" />`,
            `  <p:menuitem value="Registro Aspirante"`,
            `              url="registro.xhtml"`,
            `              icon="pi pi-user-plus" />`,
            `  <p:menuitem value="Administrador"`,
            `              url="admin.xhtml"`,
            `              icon="pi pi-cog" />`,
            `  <p:menuitem value="Simulador CDT"`,
            `              url="cdt.xhtml"`,
            `              icon="pi pi-calculator" />`,
            `  <f:facet name="options">`,
            `    <h:outputText value="VillamilWebUD" />`,
            `  </f:facet>`,
            `</p:menubar>`,
        ],
        donde: "En las 4 vistas (index, registro, admin, cdt) reemplazando el navbar Bootstrap.",
    },
    {
        nombre: "p:panel",
        descripcion: "Contenedor con cabecera y cuerpo, ideal para agrupar formularios. El atributo toggleable permite plegarlo y desplegarlo con animación.",
        atributos: [
            ["header",      "Texto de la cabecera del panel."],
            ["toggleable",  "true: permite plegar y desplegar (default false)."],
            ["toggleSpeed", "Duración en ms de la animación (default 500)."],
            ["closable",    "Muestra un botón ✕ que oculta el panel."],
            ["collapsed",   "Estado inicial: si arranca plegado o no."],
        ],
        codigo: [
            `<p:panel id="panelFormAsp"`,
            `         header="Formulario Aspirante"`,
            `         toggleable="true"`,
            `         toggleSpeed="300"`,
            `         styleClass="ud-panel mt-4">`,
            ``,
            `  <f:facet name="footer">`,
            `    <h:outputText`,
            `      value="Complete los campos (*)" />`,
            `  </f:facet>`,
            ``,
            `  <h:form prependId="false">`,
            `    <!-- campos del formulario -->`,
            `  </h:form>`,
            `</p:panel>`,
        ],
        donde: "En registro.xhtml — envuelve el formulario de registro de aspirantes.",
    },
    {
        nombre: "p:dataTable",
        descripcion: "Tabla avanzada con paginación, ordenamiento por columna, filtros, selección, exportación y AJAX. Reemplaza por completo a h:dataTable y es el componente más usado de PrimeFaces.",
        atributos: [
            ["value / var",            "Lista que alimenta la tabla y nombre de variable por fila."],
            ["paginator / rows",       "Habilita paginador y define filas por página."],
            ["rowsPerPageTemplate",    "Opciones de tamaño de página, ej. \"5,10,20\"."],
            ["sortBy / filterBy",      "Ordenamiento y filtrado declarativo en p:column."],
            ["emptyMessage",           "Mensaje cuando no hay datos."],
        ],
        codigo: [
            `<p:dataTable id="tablaAspirantes"`,
            `             value="#{asp.listaAs}"`,
            `             var="aspirante"`,
            `             paginator="true"`,
            `             rows="5"`,
            `             rowsPerPageTemplate="5,10,20"`,
            `             emptyMessage="Sin aspirantes.">`,
            ``,
            `  <p:column headerText="Identificación"`,
            `            sortBy="#{aspirante.id_p}"`,
            `            filterBy="#{aspirante.id_p}"`,
            `            filterMatchMode="contains">`,
            `    <h:outputText value="#{aspirante.id_p}" />`,
            `  </p:column>`,
            `  <!-- más p:column ... -->`,
            `</p:dataTable>`,
        ],
        donde: "En admin.xhtml (lista aspirantes con filtros) y en cdt.xhtml (historial de simulaciones).",
    },
    {
        nombre: "p:accordionPanel",
        descripcion: "Contenedor de secciones plegables. Por defecto solo una pestaña p:tab está abierta a la vez. Útil para presentar información extensa categorizada.",
        atributos: [
            ["activeIndex", "Índice de la pestaña abierta al cargar la página."],
            ["multiple",    "Permite tener varias pestañas abiertas simultáneamente."],
            ["dynamic",     "Carga el contenido de cada pestaña solo al activarla (lazy)."],
            ["cache",       "Almacena el contenido tras la primera carga."],
            ["styleClass",  "Clase CSS adicional."],
        ],
        codigo: [
            `<p:accordionPanel`,
            `      id="accordionCdt"`,
            `      activeIndex="0"`,
            `      multiple="false">`,
            ``,
            `  <p:tab title="Historial de simulaciones">`,
            `    <p:dataTable value="#{cdt.historial}"`,
            `                 var="sim"> ... </p:dataTable>`,
            `  </p:tab>`,
            ``,
            `  <p:tab title="Información del cálculo">`,
            `    <p>ganancia = inv × tasa × días/360</p>`,
            `  </p:tab>`,
            ``,
            `  <p:tab title="Rangos válidos de entrada">`,
            `    <ul><li>Inversión: $100k — $5.000M</li></ul>`,
            `  </p:tab>`,
            `</p:accordionPanel>`,
        ],
        donde: "En cdt.xhtml — agrupa: historial de simulaciones, fórmula del cálculo y rangos válidos.",
    },
    {
        nombre: "p:dialog",
        descripcion: "Ventana modal flotante. Se muestra/oculta por JavaScript a través de su widgetVar, normalmente en respuesta a un botón. Útil para confirmaciones o vistas de detalle.",
        atributos: [
            ["header / widgetVar",  "Título y nombre JS para PF('var').show()/hide()."],
            ["modal",               "Bloquea el resto de la página mientras está abierto."],
            ["closable / resizable","Botón ✕ y posibilidad de redimensionar."],
            ["width / position",    "Dimensiones y posición inicial (center, top, etc.)."],
            ["dynamic",             "Carga lazy: contenido al primer show()."],
        ],
        codigo: [
            `<!-- Disparador (en una columna de la tabla) -->`,
            `<p:commandButton value="Ver"`,
            `   icon="pi pi-eye"`,
            `   action="#{asp.verDetalle(aspirante)}"`,
            `   update=":dlgDetalle"`,
            `   oncomplete="PF('dlgDetalleAsp').show()" />`,
            ``,
            `<!-- Diálogo modal -->`,
            `<p:dialog id="dlgDetalle"`,
            `          header="Detalle del aspirante"`,
            `          widgetVar="dlgDetalleAsp"`,
            `          modal="true"`,
            `          closable="true"`,
            `          width="500"`,
            `          position="center">`,
            `  <h:panelGrid columns="2">`,
            `    <h:outputText value="ID:" />`,
            `    <h:outputText`,
            `         value="#{asp.seleccionado.id_p}" />`,
            `  </h:panelGrid>`,
            `</p:dialog>`,
        ],
        donde: "En admin.xhtml — al pulsar «Ver» en la tabla, abre el diálogo con todos los datos del aspirante.",
    },
    {
        nombre: "p:chart",
        descripcion: "Gráficas estadísticas basadas en Chart.js. Soporta line, bar, pie, donut, polarArea, radar y bubble. Los datos provienen de modelos Java construidos en el bean.",
        atributos: [
            ["type",       "line | bar | pie | donut | polarArea | radar | bubble."],
            ["model",      "PieChartModel / BarChartModel / LineChartModel del bean."],
            ["style",      "Estilos CSS inline (alto y ancho del lienzo)."],
            ["responsive", "Adapta el tamaño automáticamente al contenedor."],
            ["extender",   "Función JavaScript para personalizar opciones de Chart.js."],
        ],
        codigo: [
            `<!-- Vista (admin.xhtml) -->`,
            `<p:chart type="pie"`,
            `         model="#{asp.graficaPrograma}"`,
            `         style="width:100%;height:320px;" />`,
            ``,
            `// Bean (AspiranteBean.java)`,
            `public PieChartModel getGraficaPrograma() {`,
            `  PieChartModel model = new PieChartModel();`,
            `  ChartData data = new ChartData();`,
            `  PieChartDataSet ds = new PieChartDataSet();`,
            `  Map<String,Integer> conteo = new`,
            `       LinkedHashMap<>();`,
            `  for (Aspirante a : listaAs) conteo.merge(`,
            `      a.getPro_acad().getNombre_prog(),`,
            `      1, Integer::sum);`,
            `  ds.setData(new ArrayList<>(conteo.values()));`,
            `  data.addChartDataSet(ds);`,
            `  data.setLabels(new ArrayList<>(conteo.keySet()));`,
            `  model.setData(data); return model;`,
            `}`,
        ],
        donde: "En admin.xhtml — gráfica de torta con la distribución de aspirantes por programa académico.",
    },
];

// ----------------------------------------------------------------------
// SLIDE 1 — Portada
// ----------------------------------------------------------------------
{
    const s = pres.addSlide();
    s.background = { color: NAVY };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.6, fill: { color: TEAL }, line: { color: TEAL, width: 0 } });
    s.addText("UNIVERSIDAD DISTRITAL FRANCISCO JOSÉ DE CALDAS",
        { x: 0.3, y: 0.05, w: 9.4, h: 0.5, fontSize: 13, bold: true, color: WHITE, fontFace: HEAD_FONT, charSpacing: 4, valign: "middle", margin: 0 });

    s.addText("Componentes de PrimeFaces",
        { x: 0.5, y: 1.5, w: 9, h: 0.9, fontSize: 46, bold: true, color: WHITE, fontFace: HEAD_FONT, align: "center", margin: 0 });
    s.addText("aplicados al proyecto VillamilWebUD",
        { x: 0.5, y: 2.45, w: 9, h: 0.45, fontSize: 22, italic: true, color: CREAM, fontFace: BODY_FONT, align: "center", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 4.5, y: 3.1, w: 1, h: 0.04, fill: { color: SAGE }, line: { color: SAGE, width: 0 } });

    s.addText("David Villamil",
        { x: 0.5, y: 3.35, w: 9, h: 0.4, fontSize: 22, bold: true, color: WHITE, fontFace: HEAD_FONT, align: "center", margin: 0 });
    s.addText("Programación Avanzada — Grupo 31 — 2026",
        { x: 0.5, y: 3.78, w: 9, h: 0.3, fontSize: 14, color: CREAM, fontFace: BODY_FONT, align: "center", margin: 0 });
    s.addText("Docente: Ing. Noé Arcos Muñoz",
        { x: 0.5, y: 4.08, w: 9, h: 0.3, fontSize: 12, color: "B6C8D8", fontFace: BODY_FONT, align: "center", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.05, w: 10, h: 0.58, fill: { color: TEAL }, line: { color: TEAL, width: 0 } });
    s.addText("github.com/Alejandrop1i/VillamilWebUD",
        { x: 0.3, y: 5.05, w: 9.4, h: 0.58, fontSize: 13, bold: true, color: WHITE, fontFace: MONO_FONT, align: "center", valign: "middle", margin: 0 });
}

// Total slides para el footer
const TOTAL = 12;
let n = 1;

// ----------------------------------------------------------------------
// SLIDE 2 — Agenda
// ----------------------------------------------------------------------
{
    n++;
    const s = pres.addSlide();
    s.background = { color: BG };
    bandaSuperior(s, NAVY);
    tituloSlide(s, "Agenda", "Recorrido de la presentación");

    const items = [
        { num: "01", txt: "¿Qué es PrimeFaces?" },
        { num: "02", txt: "<p:menubar> — Menú de navegación" },
        { num: "03", txt: "<p:panel> — Contenedor plegable" },
        { num: "04", txt: "<p:dataTable> — Tabla avanzada" },
        { num: "05", txt: "<p:accordionPanel> — Acordeón" },
        { num: "06", txt: "<p:dialog> — Ventana modal" },
        { num: "07", txt: "<p:chart> — Gráficas" },
        { num: "08", txt: "Conclusiones y referencias" },
    ];
    items.forEach((it, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 0.5 + col * 4.6;
        const y = 1.5 + row * 0.85;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.7, h: 0.7, fill: { color: TEAL }, line: { color: TEAL, width: 0 } });
        s.addText(it.num, {
            x, y, w: 0.7, h: 0.7,
            fontSize: 22, bold: true, color: WHITE, fontFace: HEAD_FONT, align: "center", valign: "middle", margin: 0,
        });
        s.addText(it.txt, {
            x: x + 0.85, y, w: 3.65, h: 0.7,
            fontSize: 14, color: TEXT, fontFace: BODY_FONT, valign: "middle", margin: 0,
        });
    });

    pieDePagina(s, n, TOTAL);
}

// ----------------------------------------------------------------------
// SLIDE 3 — ¿Qué es PrimeFaces? + integración
// ----------------------------------------------------------------------
{
    n++;
    const s = pres.addSlide();
    s.background = { color: BG };
    bandaSuperior(s, NAVY);
    tituloSlide(s, "¿Qué es PrimeFaces?", "Biblioteca de componentes UI para Jakarta Faces");

    s.addText([
        { text: "PrimeFaces", options: { bold: true, color: NAVY } },
        { text: " es una librería de código abierto que provee más de ", options: {} },
        { text: "100 componentes UI", options: { bold: true } },
        { text: " (tablas, gráficas, diálogos, calendarios, menús, validadores) integrados con el ciclo de vida JSF y con soporte AJAX nativo.", options: {} },
    ], { x: 0.45, y: 1.4, w: 5.2, h: 1.3, fontSize: 13, color: TEXT, fontFace: BODY_FONT, valign: "top", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: 2.85, w: 0.18, h: 0.3, fill: { color: TEAL }, line: { color: TEAL, width: 0 } });
    s.addText("Integración con el proyecto", { x: 0.7, y: 2.78, w: 5, h: 0.4, fontSize: 14, bold: true, color: NAVY, fontFace: HEAD_FONT, margin: 0 });

    s.addText("1. Dependencia Maven (pom.xml):", { x: 0.45, y: 3.2, w: 5.2, h: 0.25, fontSize: 11, color: MUTED, fontFace: BODY_FONT, margin: 0 });
    bloqueCodigo(s, [
        `<dependency>`,
        `  <groupId>org.primefaces</groupId>`,
        `  <artifactId>primefaces</artifactId>`,
        `  <version>14.0.0</version>`,
        `  <classifier>jakarta</classifier>`,
        `</dependency>`,
    ], { x: 0.45, y: 3.42, w: 5.2, h: 1.45, size: 9.5 });

    s.addText("2. Namespace en cada vista XHTML:", { x: 5.85, y: 1.4, w: 4, h: 0.25, fontSize: 11, color: MUTED, fontFace: BODY_FONT, margin: 0 });
    bloqueCodigo(s, [
        `<html`,
        `  xmlns="http://www.w3.org/1999/xhtml"`,
        `  xmlns:h="jakarta.faces.html"`,
        `  xmlns:f="jakarta.faces.core"`,
        `  xmlns:p="primefaces">`,
    ], { x: 5.85, y: 1.62, w: 4, h: 1.25, size: 9.5 });

    s.addText("Arquitectura del proyecto", { x: 5.85, y: 3, w: 4, h: 0.3, fontSize: 14, bold: true, color: NAVY, fontFace: HEAD_FONT, margin: 0 });
    s.addText([
        { text: "MODELO", options: { bold: true, color: TEAL, breakLine: false } },
        { text: " — POJOs + DAO en /asp/modelo y /cdt/modelo.", options: { breakLine: true } },
        { text: "CONTROLADOR", options: { bold: true, color: TEAL, breakLine: false } },
        { text: " — beans CDI en /asp/bean y /cdt/bean.", options: { breakLine: true } },
        { text: "VISTA", options: { bold: true, color: TEAL, breakLine: false } },
        { text: " — XHTML en /webapp (4 vistas + cdt.xhtml).", options: {} },
    ], { x: 5.85, y: 3.32, w: 4, h: 1.55, fontSize: 11.5, color: TEXT, fontFace: BODY_FONT, valign: "top", paraSpaceAfter: 4, margin: 0 });

    pieDePagina(s, n, TOTAL);
}

// ----------------------------------------------------------------------
// SLIDES 4-9 — Componentes
// ----------------------------------------------------------------------
COMPONENTES.forEach((c, idx) => {
    n++;
    const s = pres.addSlide();
    s.background = { color: BG };
    bandaSuperior(s, NAVY);

    // Etiqueta superior pequeña
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 0.18, w: 1.6, h: 0.3, fill: { color: TEAL }, line: { color: TEAL, width: 0 } });
    s.addText(`COMPONENTE ${idx + 1} / 6`,
        { x: 0.4, y: 0.18, w: 1.6, h: 0.3, fontSize: 9, bold: true, color: WHITE, fontFace: BODY_FONT, align: "center", valign: "middle", charSpacing: 3, margin: 0 });

    s.addText(`<${c.nombre}>`,
        { x: 0.4, y: 0.55, w: 9.2, h: 0.55, fontSize: 32, bold: true, color: NAVY, fontFace: MONO_FONT, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.15, w: 0.45, h: 0.05, fill: { color: TEAL }, line: { color: TEAL, width: 0 } });

    // Descripción
    s.addText(c.descripcion,
        { x: 0.4, y: 1.3, w: 4.6, h: 0.95, fontSize: 11.5, color: TEXT, fontFace: BODY_FONT, valign: "top", margin: 0 });

    // Atributos
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 2.32, w: 0.18, h: 0.27, fill: { color: TEAL }, line: { color: TEAL, width: 0 } });
    s.addText("Atributos clave",
        { x: 0.65, y: 2.27, w: 4.4, h: 0.35, fontSize: 13, bold: true, color: NAVY, fontFace: HEAD_FONT, margin: 0 });

    tablaAtributos(s, c.atributos, { x: 0.4, y: 2.65, w: 4.6, h: 2.2 });

    // Código
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.32, w: 0.18, h: 0.27, fill: { color: SAGE }, line: { color: SAGE, width: 0 } });
    s.addText("Ejemplo (extraído del proyecto)",
        { x: 5.45, y: 1.27, w: 4.3, h: 0.35, fontSize: 13, bold: true, color: NAVY, fontFace: HEAD_FONT, margin: 0 });

    bloqueCodigo(s, c.codigo, { x: 5.2, y: 1.65, w: 4.6, h: 3.2, size: 9 });

    // Dónde se usa (caja inferior izquierda)
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.95, w: 9.4, h: 0.42, fill: { color: NAVY }, line: { color: NAVY, width: 0 } });
    s.addText([
        { text: "DÓNDE SE USA · ", options: { bold: true, color: CREAM, charSpacing: 2 } },
        { text: c.donde, options: { color: WHITE } },
    ], { x: 0.55, y: 4.95, w: 9.1, h: 0.42, fontSize: 11, fontFace: BODY_FONT, valign: "middle", margin: 0 });

    pieDePagina(s, n, TOTAL);
});

// ----------------------------------------------------------------------
// SLIDE 10 — Conclusiones
// ----------------------------------------------------------------------
{
    n++;
    const s = pres.addSlide();
    s.background = { color: BG };
    bandaSuperior(s, NAVY);
    tituloSlide(s, "Conclusiones", "Lo aprendido al integrar PrimeFaces en VillamilWebUD");

    const conclusiones = [
        {
            titulo: "Menos código",
            texto: "Componentes como p:dataTable reducen drásticamente el HTML/JS necesario. Lo que en Bootstrap puro requiere 30+ líneas, aquí se hace en 10.",
        },
        {
            titulo: "MVC transparente",
            texto: "Las vistas declaran #{bean.propiedad} y PrimeFaces se encarga de la comunicación AJAX vista ↔ controlador, sin scripts adicionales.",
        },
        {
            titulo: "Cobertura completa",
            texto: "Los 6 componentes elegidos cubren las necesidades típicas: navegación, agrupación, listados, formularios secundarios, detalle y reportes visuales.",
        },
        {
            titulo: "Convive con Bootstrap",
            texto: "Adoptar PrimeFaces no implica abandonar Bootstrap; se usan en conjunto: PrimeFaces para componentes interactivos, Bootstrap para grilla y utilitarios.",
        },
    ];
    conclusiones.forEach((c, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 0.4 + col * 4.7;
        const y = 1.45 + row * 1.65;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.45, fill: { color: WHITE }, line: { color: "DDDDDD", width: 0.5 } });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.08, h: 1.45, fill: { color: TEAL }, line: { color: TEAL, width: 0 } });
        s.addText(c.titulo,
            { x: x + 0.25, y: y + 0.1, w: 4.1, h: 0.4, fontSize: 14, bold: true, color: NAVY, fontFace: HEAD_FONT, valign: "top", margin: 0 });
        s.addText(c.texto,
            { x: x + 0.25, y: y + 0.5, w: 4.1, h: 0.85, fontSize: 11, color: TEXT, fontFace: BODY_FONT, valign: "top", margin: 0 });
    });

    pieDePagina(s, n, TOTAL);
}

// ----------------------------------------------------------------------
// SLIDE 11 — Referencias
// ----------------------------------------------------------------------
{
    n++;
    const s = pres.addSlide();
    s.background = { color: BG };
    bandaSuperior(s, NAVY);
    tituloSlide(s, "Referencias", "Documentación oficial consultada");

    const refs = [
        ["PrimeFaces Showcase",  "showcase.primefaces.org",                 "Demos interactivos por componente."],
        ["PrimeFaces User Guide","primefaces.org/docs/guide/14_user_guide.pdf", "Manual oficial PrimeFaces 14."],
        ["Jakarta Faces 4.0",    "jakarta.ee/specifications/faces/4.0",     "Especificación oficial JSF."],
        ["Jakarta CDI 4.0",      "jakarta.ee/specifications/cdi/4.0",       "Especificación de inyección de dependencias."],
        ["Apache Tomcat 10",     "tomcat.apache.org/tomcat-10.1-doc",       "Documentación del contenedor servlet."],
        ["Bootstrap 5.3",        "getbootstrap.com/docs/5.3",               "Sistema de grillas y utilidades CSS."],
        ["Chart.js",             "chartjs.org/docs/latest",                  "Motor subyacente de p:chart."],
    ];
    refs.forEach((r, i) => {
        const y = 1.45 + i * 0.5;
        s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 0.05, h: 0.4, fill: { color: TEAL }, line: { color: TEAL, width: 0 } });
        s.addText(r[0],
            { x: 0.55, y, w: 2.6, h: 0.4, fontSize: 12, bold: true, color: NAVY, fontFace: HEAD_FONT, valign: "middle", margin: 0 });
        s.addText(r[1],
            { x: 3.2, y, w: 3.2, h: 0.4, fontSize: 11, color: TEAL, fontFace: MONO_FONT, valign: "middle", margin: 0 });
        s.addText(r[2],
            { x: 6.45, y, w: 3.4, h: 0.4, fontSize: 10.5, color: MUTED, italic: true, fontFace: BODY_FONT, valign: "middle", margin: 0 });
    });

    pieDePagina(s, n, TOTAL);
}

// ----------------------------------------------------------------------
// SLIDE 12 — Cierre
// ----------------------------------------------------------------------
{
    n++;
    const s = pres.addSlide();
    s.background = { color: NAVY };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 2.3, w: 10, h: 0.05, fill: { color: TEAL }, line: { color: TEAL, width: 0 } });

    s.addText("¡Gracias!",
        { x: 0.5, y: 1.3, w: 9, h: 0.95, fontSize: 56, bold: true, color: WHITE, fontFace: HEAD_FONT, align: "center", margin: 0 });
    s.addText("Preguntas y comentarios",
        { x: 0.5, y: 2.45, w: 9, h: 0.5, fontSize: 18, italic: true, color: CREAM, fontFace: BODY_FONT, align: "center", margin: 0 });

    s.addText([
        { text: "David Villamil", options: { bold: true, color: WHITE, fontSize: 16, breakLine: true } },
        { text: "Programación Avanzada — Grupo 31", options: { color: CREAM, fontSize: 13, breakLine: true } },
        { text: "Universidad Distrital Francisco José de Caldas — 2026", options: { color: CREAM, fontSize: 12, breakLine: true } },
        { text: " ", options: { fontSize: 8, breakLine: true } },
        { text: "github.com/Alejandrop1i/VillamilWebUD", options: { color: SAGE, fontSize: 13, fontFace: MONO_FONT } },
    ], { x: 0.5, y: 3.5, w: 9, h: 1.7, fontFace: BODY_FONT, align: "center", valign: "top", margin: 0 });
}

// ----------------------------------------------------------------------
// Guardar
// ----------------------------------------------------------------------
const outPath = path.join(__dirname, "PrimeFaces_VillamilWebUD.pptx");
pres.writeFile({ fileName: outPath }).then(() => {
    console.log("OK — generado:", outPath);
}).catch((e) => {
    console.error("Error:", e);
    process.exit(1);
});
