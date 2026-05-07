/*
 * Script generador del documento Word "PrimeFaces_VillamilWebUD.docx".
 * Autor: David Villamil — Programación Avanzada — Grupo 31 — UD — 2026
 *
 * Ejecución:
 *   cd <ruta del proyecto>
 *   node docs/generar_documento_primefaces.js
 *
 * Salida:
 *   docs/PrimeFaces_VillamilWebUD.docx
 */
const fs = require("fs");
const path = require("path");
const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    Header, Footer, AlignmentType, LevelFormat, PageNumber, PageBreak,
    TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
    TabStopType, TabStopPosition,
} = require("docx");

// ----------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------
const COLOR_PRIMARY = "092B5A";
const COLOR_SECONDARY = "09738A";
const COLOR_ROW_HEADER = "DAE8FC";
const COLOR_ROW_ALT = "F5F5F5";
const COLOR_CODE_BG = "F0F0F0";

const border = { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB" };
const borders = { top: border, bottom: border, left: border, right: border };

function P(text, options = {}) {
    return new Paragraph({
        children: [new TextRun({ text, ...options.run })],
        ...options,
    });
}

function H1(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text })],
    });
}

function H2(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text })],
    });
}

function bullet(text) {
    return new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun(text)],
    });
}

function code(lines) {
    // Cada línea = un Paragraph con fondo gris claro y fuente monoespaciada.
    return lines.map((line) => new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { type: ShadingType.CLEAR, fill: COLOR_CODE_BG },
        children: [new TextRun({ text: line || " ", font: "Consolas", size: 18 })],
    }));
}

function attrTable(filas) {
    const rows = [
        new TableRow({
            tableHeader: true,
            children: ["Atributo", "Tipo", "Descripción"].map((h) => new TableCell({
                borders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { type: ShadingType.CLEAR, fill: COLOR_ROW_HEADER },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })],
            })),
        }),
        ...filas.map((f, i) => new TableRow({
            children: f.map((c, j) => new TableCell({
                borders,
                width: { size: [1800, 1500, 6060][j], type: WidthType.DXA },
                shading: i % 2 === 1 ? { type: ShadingType.CLEAR, fill: COLOR_ROW_ALT } : undefined,
                margins: { top: 60, bottom: 60, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({
                    text: c,
                    font: j === 0 ? "Consolas" : "Arial",
                    size: j === 0 ? 18 : 20,
                })] })],
            })),
        })),
    ];
    return new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1800, 1500, 6060],
        rows,
    });
}

// ----------------------------------------------------------------------
// Contenido por componente
// ----------------------------------------------------------------------
const COMPONENTES = [
    // 1. menubar
    {
        nombre: "p:menubar",
        intro: "Barra de menú horizontal usada como navegación principal del sitio. Contiene enlaces, acciones y submenús opcionales. Soporta iconos PrimeIcons y un facet «options» para colocar elementos al extremo derecho (logo, botón de usuario, etc.).",
        atributos: [
            ["id", "String", "Identificador único del componente."],
            ["model", "MenuModel", "Modelo de menú generado en el bean (alternativa a items declarativos)."],
            ["styleClass", "String", "Clase CSS adicional aplicada al elemento raíz."],
            ["style", "String", "Estilos CSS inline."],
            ["autoDisplay", "Boolean", "Si es true, los submenús se abren al pasar el mouse (default: true)."],
            ["tabindex", "String", "Posición de tabulación para accesibilidad."],
            ["widgetVar", "String", "Variable JavaScript para controlar el componente desde el cliente."],
        ],
        ejemplo: [
            `<p:menubar styleClass="ud-menubar">`,
            `    <p:menuitem value="Inicio"             url="index.xhtml"    icon="pi pi-home" />`,
            `    <p:menuitem value="Registro Aspirante" url="registro.xhtml" icon="pi pi-user-plus" />`,
            `    <p:menuitem value="Administrador"      url="admin.xhtml"    icon="pi pi-cog" />`,
            `    <p:menuitem value="Simulador CDT"      url="cdt.xhtml"      icon="pi pi-calculator" />`,
            `    <f:facet name="options">`,
            `        <h:outputText value="VillamilWebUD" styleClass="ud-brand" />`,
            `    </f:facet>`,
            `</p:menubar>`,
        ],
        usoEnApp: "Implementado en las 4 vistas (index.xhtml, registro.xhtml, admin.xhtml, cdt.xhtml) reemplazando el navbar Bootstrap original. Cada p:menuitem usa el atributo url para navegar a la página correspondiente.",
    },
    // 2. panel
    {
        nombre: "p:panel",
        intro: "Contenedor con cabecera y cuerpo, ideal para agrupar secciones de un formulario. Su atributo «toggleable» permite plegar y desplegar el contenido con animación, ahorrando espacio en pantalla.",
        atributos: [
            ["id", "String", "Identificador único del componente."],
            ["header", "String", "Texto de la cabecera del panel."],
            ["toggleable", "Boolean", "Permite plegar/desplegar el contenido (default: false)."],
            ["toggleSpeed", "Integer", "Duración en milisegundos de la animación (default: 500)."],
            ["closable", "Boolean", "Muestra un botón de cierre que oculta el panel."],
            ["collapsed", "Boolean", "Estado inicial: si está plegado al cargar la página."],
            ["styleClass", "String", "Clase CSS adicional."],
            ["widgetVar", "String", "Variable JavaScript para el manejo dinámico desde cliente."],
        ],
        ejemplo: [
            `<p:panel id="panelFormAsp"`,
            `         header="Formulario Aspirante"`,
            `         toggleable="true"`,
            `         toggleSpeed="300"`,
            `         styleClass="ud-panel mt-4">`,
            `    <f:facet name="footer">`,
            `        <h:outputText value="Complete todos los campos requeridos (*)" />`,
            `    </f:facet>`,
            ``,
            `    <h:form prependId="false">`,
            `        <!-- campos del formulario aquí -->`,
            `    </h:form>`,
            `</p:panel>`,
        ],
        usoEnApp: "Envuelve el formulario de registro de aspirantes en registro.xhtml. El usuario puede plegar el panel para ocultarlo cuando no está diligenciando, gracias al atributo toggleable.",
    },
    // 3. dataTable
    {
        nombre: "p:dataTable",
        intro: "Tabla avanzada con paginación, ordenamiento por columna, filtros, selección de filas, exportación y manipulación AJAX. Reemplaza por completo a h:dataTable y es el componente más usado de PrimeFaces en aplicaciones empresariales.",
        atributos: [
            ["value", "Collection", "Datos que alimentan la tabla (ej. lista de objetos)."],
            ["var", "String", "Nombre de variable que representa cada fila (ej. «aspirante»)."],
            ["paginator", "Boolean", "Habilita el paginador (default: false)."],
            ["rows", "Integer", "Filas por página."],
            ["rowsPerPageTemplate", "String", "Opciones de tamaño de página, ej. \"5,10,20\"."],
            ["paginatorPosition", "String", "Posición del paginador: top, bottom o both."],
            ["sortBy", "Object", "Campo por el que se ordena la fila completa."],
            ["sortMode", "String", "single o multiple."],
            ["emptyMessage", "String", "Mensaje cuando no hay datos."],
            ["selection / selectionMode", "Mixed", "Habilita selección de fila(s)."],
            ["filteredValue", "List", "Lista filtrada en memoria."],
            ["lazy", "Boolean", "Habilita carga perezosa para conjuntos grandes."],
        ],
        ejemplo: [
            `<p:dataTable id="tablaAspirantes"`,
            `             value="#{asp.listaAs}"`,
            `             var="aspirante"`,
            `             paginator="true"`,
            `             rows="5"`,
            `             rowsPerPageTemplate="5,10,20"`,
            `             emptyMessage="No hay aspirantes registrados.">`,
            ``,
            `    <p:column headerText="Identificación"`,
            `              sortBy="#{aspirante.id_p}"`,
            `              filterBy="#{aspirante.id_p}"`,
            `              filterMatchMode="contains">`,
            `        <h:outputText value="#{aspirante.id_p}" />`,
            `    </p:column>`,
            `    <!-- más p:column ... -->`,
            `</p:dataTable>`,
        ],
        usoEnApp: "Sustituye la tabla h:dataTable original en admin.xhtml para listar todos los aspirantes con filtros y paginación. También se usa dentro del p:accordionPanel en cdt.xhtml para mostrar el historial de simulaciones.",
    },
    // 4. accordionPanel
    {
        nombre: "p:accordionPanel",
        intro: "Contenedor de secciones plegables. A diferencia de p:panel, agrupa varias pestañas (p:tab) y por defecto solo una está abierta a la vez. Útil para presentar información extensa organizada en categorías.",
        atributos: [
            ["activeIndex", "Integer/String", "Índice (o índices) de la(s) pestaña(s) abiertas al cargar."],
            ["multiple", "Boolean", "Permite tener varias pestañas abiertas simultáneamente."],
            ["dynamic", "Boolean", "Carga el contenido de la pestaña solo al activarla (lazy)."],
            ["cache", "Boolean", "Almacena el contenido tras la primera carga (con dynamic=true)."],
            ["styleClass", "String", "Clase CSS adicional."],
            ["widgetVar", "String", "Variable JavaScript para control desde cliente."],
        ],
        ejemplo: [
            `<p:accordionPanel id="accordionCdt"`,
            `                  activeIndex="0"`,
            `                  multiple="false"`,
            `                  styleClass="ud-accordion">`,
            ``,
            `    <p:tab title="Historial de simulaciones">`,
            `        <!-- p:dataTable con el historial -->`,
            `    </p:tab>`,
            ``,
            `    <p:tab title="Información del cálculo">`,
            `        <p>Fórmula: ganancia = inversión × tasa × plazo / 360</p>`,
            `    </p:tab>`,
            ``,
            `    <p:tab title="Rangos válidos de entrada">`,
            `        <ul><li>Inversión: $100.000 — $5.000.000.000</li></ul>`,
            `    </p:tab>`,
            `</p:accordionPanel>`,
        ],
        usoEnApp: "Implementado al final de cdt.xhtml para agrupar tres secciones de apoyo al simulador: el historial de simulaciones (con tabla), la explicación de la fórmula matemática y los rangos válidos de entrada.",
    },
    // 5. dialog
    {
        nombre: "p:dialog",
        intro: "Ventana modal flotante. Se muestra y oculta mediante JavaScript a través de su widgetVar, normalmente en respuesta a un evento del usuario (p:commandButton oncomplete). Útil para confirmaciones, formularios secundarios o vistas de detalle.",
        atributos: [
            ["id", "String", "Identificador único del componente."],
            ["header", "String", "Título visible en la cabecera."],
            ["widgetVar", "String", "Nombre JavaScript usado en PF('widgetVar').show()/hide()."],
            ["modal", "Boolean", "Bloquea el resto de la página mientras está abierto."],
            ["closable", "Boolean", "Muestra el botón X de cierre (default: true)."],
            ["resizable", "Boolean", "Permite redimensionar la ventana."],
            ["draggable", "Boolean", "Permite arrastrar la ventana."],
            ["width / height", "String", "Dimensiones iniciales en píxeles o %."],
            ["position", "String", "Posición inicial: center, top, bottom, etc."],
            ["dynamic", "Boolean", "Carga el contenido al mostrar el diálogo por primera vez (lazy)."],
            ["showEffect / hideEffect", "String", "Animaciones de aparición/cierre (fade, slide, etc.)."],
        ],
        ejemplo: [
            `<!-- Botón disparador en una columna de la tabla -->`,
            `<p:commandButton value="Ver"`,
            `                 icon="pi pi-eye"`,
            `                 action="#{asp.verDetalle(aspirante)}"`,
            `                 update=":dlgDetalle"`,
            `                 oncomplete="PF('dlgDetalleAsp').show()" />`,
            ``,
            `<!-- Diálogo modal con los datos del aspirante seleccionado -->`,
            `<p:dialog id="dlgDetalle"`,
            `          header="Detalle del aspirante"`,
            `          widgetVar="dlgDetalleAsp"`,
            `          modal="true"`,
            `          closable="true"`,
            `          width="500"`,
            `          position="center">`,
            `    <h:panelGrid columns="2">`,
            `        <h:outputText value="Identificación:" />`,
            `        <h:outputText value="#{asp.seleccionado.id_p}" />`,
            `        <!-- ...más campos... -->`,
            `    </h:panelGrid>`,
            `</p:dialog>`,
        ],
        usoEnApp: "Implementado en admin.xhtml. Cada fila de la tabla tiene un botón «Ver» que llena el aspirante seleccionado en el bean y abre el diálogo con todos sus datos detallados.",
    },
    // 6. chart
    {
        nombre: "p:chart",
        intro: "Componente para renderizar gráficas estadísticas basadas en Chart.js. Soporta varios tipos: line (línea), bar (barras), pie (torta), donut (dona), polarArea (área polar), radar y bubble. Los datos provienen de modelos Java construidos en el bean controlador.",
        atributos: [
            ["type", "String", "Tipo de gráfica: line, bar, pie, donut, polarArea, radar, bubble."],
            ["model", "ChartModel", "Instancia de modelo construida en el bean (PieChartModel, BarChartModel, etc.)."],
            ["style", "String", "Estilos CSS inline (ancho/alto)."],
            ["styleClass", "String", "Clase CSS adicional."],
            ["responsive", "Boolean", "Adapta el tamaño al contenedor."],
            ["extender", "String", "Función JavaScript para personalizar opciones de Chart.js."],
        ],
        ejemplo: [
            `<!-- Vista (admin.xhtml) -->`,
            `<p:chart type="pie"`,
            `         model="#{asp.graficaPrograma}"`,
            `         style="width:100%; height:320px;"`,
            `         styleClass="ud-chart" />`,
            ``,
            `// Bean (AspiranteBean.java)`,
            `public PieChartModel getGraficaPrograma() {`,
            `    PieChartModel model = new PieChartModel();`,
            `    ChartData data = new ChartData();`,
            `    PieChartDataSet ds = new PieChartDataSet();`,
            ``,
            `    Map<String, Integer> conteo = new LinkedHashMap<>();`,
            `    for (Aspirante a : listaAs) {`,
            `        conteo.merge(a.getPro_acad().getNombre_prog(), 1, Integer::sum);`,
            `    }`,
            ``,
            `    ds.setData(new ArrayList<>(conteo.values()));`,
            `    ds.setBackgroundColor(coloresUD);`,
            `    data.addChartDataSet(ds);`,
            `    data.setLabels(new ArrayList<>(conteo.keySet()));`,
            `    model.setData(data);`,
            `    return model;`,
            `}`,
        ],
        usoEnApp: "Implementado en admin.xhtml. Una gráfica de torta (type=\"pie\") muestra la distribución de aspirantes registrados según su programa académico. El modelo PieChartModel se calcula en AspiranteBean a partir de la lista de aspirantes en memoria.",
    },
];

// ----------------------------------------------------------------------
// Estructura del documento
// ----------------------------------------------------------------------
const portada = [
    new Paragraph({ spacing: { before: 2400, after: 200 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Universidad Distrital Francisco José de Caldas", bold: true, size: 28, color: COLOR_PRIMARY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new TextRun({ text: "Programación Avanzada — Grupo 31 — 2026", size: 24, color: COLOR_SECONDARY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1800, after: 200 },
        children: [new TextRun({ text: "Componentes de PrimeFaces", bold: true, size: 56, color: COLOR_PRIMARY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 800 },
        children: [new TextRun({ text: "aplicados al proyecto VillamilWebUD", italics: true, size: 32, color: COLOR_SECONDARY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 2400, after: 100 },
        children: [new TextRun({ text: "Autor", size: 22, color: "555555" })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 },
        children: [new TextRun({ text: "David Villamil", bold: true, size: 28 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
        children: [new TextRun({ text: "Docente: Ing. Noé Arcos Muñoz", size: 22, color: "555555" })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
        children: [new TextRun({ text: "Repositorio: https://github.com/Alejandrop1i/VillamilWebUD", size: 20, color: "555555" })] }),
    new Paragraph({ children: [new PageBreak()] }),
];

const toc = [
    H1("Tabla de contenido"),
    new Paragraph({
        children: [new TableOfContents("Tabla de contenido", { hyperlink: true, headingStyleRange: "1-3" })],
    }),
    new Paragraph({ spacing: { before: 200, after: 0 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "(En Word: clic derecho sobre la tabla → Actualizar campos → Actualizar toda la tabla)", italics: true, size: 18, color: "777777" })] }),
    new Paragraph({ children: [new PageBreak()] }),
];

const introduccion = [
    H1("Introducción"),
    P("PrimeFaces es una biblioteca de código abierto de componentes de interfaz gráfica para Jakarta Server Faces (JSF). Provee más de 100 widgets listos para usar — tablas avanzadas, gráficas, diálogos, calendarios, editores de texto, menús, validadores, entre otros — todos integrados con el ciclo de vida JSF y con soporte AJAX nativo. Su documentación oficial vive en showcase.primefaces.org, donde cada componente cuenta con un demo interactivo y la lista completa de atributos."),
    P("Este documento describe seis componentes de PrimeFaces aplicados al proyecto VillamilWebUD, el cual implementa el patrón Modelo-Vista-Controlador (MVC) usando Jakarta Faces 4.0.1, CDI Weld y el contenedor servlet Apache Tomcat 10. Para cada componente se presenta su descripción, sus atributos principales en una tabla, un ejemplo de código tomado del propio proyecto, y la indicación precisa de dónde se utiliza dentro de la aplicación."),
    H2("Integración con el proyecto"),
    P("La librería se incorpora como dependencia Maven en el archivo pom.xml:"),
    ...code([
        `<dependency>`,
        `    <groupId>org.primefaces</groupId>`,
        `    <artifactId>primefaces</artifactId>`,
        `    <version>14.0.0</version>`,
        `    <classifier>jakarta</classifier>`,
        `</dependency>`,
    ]),
    P(" "),
    P("En las vistas XHTML se declara el namespace de PrimeFaces:"),
    ...code([
        `<html xmlns="http://www.w3.org/1999/xhtml"`,
        `      xmlns:h="jakarta.faces.html"`,
        `      xmlns:f="jakarta.faces.core"`,
        `      xmlns:p="primefaces">`,
    ]),
    P(" "),
    H2("Arquitectura MVC del proyecto"),
    bullet("MODELO: clases en src/main/java/asp/modelo y src/main/java/cdt/modelo (POJOs + DAO en memoria)."),
    bullet("CONTROLADOR: beans CDI en src/main/java/asp/bean y src/main/java/cdt/bean."),
    bullet("VISTA: archivos XHTML en src/main/webapp (index, registro, admin, cdt)."),
    new Paragraph({ children: [new PageBreak()] }),
];

const secciones = COMPONENTES.flatMap((c, i) => [
    H1(`${i + 1}. <${c.nombre}>`),
    H2("Descripción"),
    P(c.intro),
    H2("Atributos principales"),
    attrTable(c.atributos),
    P(" "),
    H2("Ejemplo de uso (extraído del proyecto VillamilWebUD)"),
    ...code(c.ejemplo),
    P(" "),
    H2("Dónde se usa en la aplicación"),
    P(c.usoEnApp),
    new Paragraph({ children: [new PageBreak()] }),
]);

const conclusiones = [
    H1("Conclusiones"),
    bullet("PrimeFaces complementa Jakarta Faces con componentes UI que reducen drásticamente la cantidad de código HTML/CSS/JavaScript que el desarrollador debe escribir manualmente. Lo que en Bootstrap puro requiere 30+ líneas (un dataTable con paginación, ordenamiento y filtros), en PrimeFaces se logra en menos de 10."),
    bullet("La integración con el patrón MVC es transparente: las vistas declaran componentes con valores expresados en EL (#{bean.propiedad}) y PrimeFaces se encarga de comunicar la vista con el controlador mediante AJAX, sin scripts adicionales del desarrollador."),
    bullet("Los seis componentes seleccionados (menubar, panel, dataTable, accordionPanel, dialog y chart) cubren las necesidades más frecuentes de cualquier aplicación web administrativa: navegación, agrupación de contenidos, listados, formularios secundarios, presentación de detalles y reportes visuales."),
    bullet("La adopción de PrimeFaces no implica abandonar Bootstrap. En VillamilWebUD ambos coexisten: PrimeFaces se encarga de los componentes interactivos y Bootstrap aporta el sistema de grilla y los utilitarios de espaciado/color."),
    bullet("Trabajar con commits separados (uno por componente) permite revisar el efecto aislado de cada cambio y facilita la corrección incremental, alineándose con buenas prácticas de control de versiones."),
];

const referencias = [
    H1("Referencias"),
    bullet("PrimeFaces Showcase. Demos interactivos por componente. https://showcase.primefaces.org"),
    bullet("PrimeFaces User Guide 14.0. Manual oficial. https://primefaces.org/docs/guide/14_user_guide.pdf"),
    bullet("Eclipse Foundation. Jakarta Server Faces 4.0 Specification. https://jakarta.ee/specifications/faces/4.0/"),
    bullet("Eclipse Foundation. Jakarta Contexts and Dependency Injection 4.0 Specification. https://jakarta.ee/specifications/cdi/4.0/"),
    bullet("Apache Software Foundation. Apache Tomcat 10 Documentation. https://tomcat.apache.org/tomcat-10.1-doc/"),
    bullet("Bootstrap 5.3 Documentation. https://getbootstrap.com/docs/5.3/"),
    bullet("Chart.js Documentation. https://www.chartjs.org/docs/latest/ (motor subyacente de p:chart)"),
];

// ----------------------------------------------------------------------
// Documento
// ----------------------------------------------------------------------
const doc = new Document({
    creator: "David Villamil",
    title: "Componentes de PrimeFaces aplicados al proyecto VillamilWebUD",
    description: "Documento académico — Programación Avanzada — Universidad Distrital — 2026",
    styles: {
        default: { document: { run: { font: "Arial", size: 22 } } },
        paragraphStyles: [
            { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 32, bold: true, font: "Arial", color: COLOR_PRIMARY },
                paragraph: { spacing: { before: 320, after: 200 }, outlineLevel: 0 } },
            { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 26, bold: true, font: "Arial", color: COLOR_SECONDARY },
                paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
        ],
    },
    numbering: {
        config: [
            { reference: "bullets",
                levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
                    style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
        ],
    },
    sections: [{
        properties: {
            page: {
                size: { width: 12240, height: 15840 },
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
            },
        },
        headers: {
            default: new Header({ children: [
                new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [new TextRun({ text: "VillamilWebUD — PrimeFaces", size: 18, color: "777777" })],
                }),
            ]}),
        },
        footers: {
            default: new Footer({ children: [
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({ text: "David Villamil — Programación Avanzada — Grupo 31 — 2026  ·  Página ", size: 18, color: "777777" }),
                        new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "777777" }),
                        new TextRun({ text: " de ", size: 18, color: "777777" }),
                        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "777777" }),
                    ],
                }),
            ]}),
        },
        children: [
            ...portada,
            ...toc,
            ...introduccion,
            ...secciones,
            ...conclusiones,
            new Paragraph({ children: [new PageBreak()] }),
            ...referencias,
        ],
    }],
});

const outPath = path.join(__dirname, "PrimeFaces_VillamilWebUD.docx");
Packer.toBuffer(doc).then((buf) => {
    fs.writeFileSync(outPath, buf);
    console.log("OK — generado:", outPath);
}).catch((err) => {
    console.error("Error:", err);
    process.exit(1);
});
