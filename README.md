# VillamilWebUD

Proyecto web Jakarta EE / JSF (Faces) desarrollado para la asignatura **Programación Avanzada – Grupo 31** de la **Universidad Distrital Francisco José de Caldas**.

## Autor

- **Nombre:** David Villamil
- **Asignatura:** Programación Avanzada — Grupo 31
- **Universidad:** Universidad Distrital Francisco José de Caldas
- **Año:** 2026
- **Docente:** Ing. Noé Arcos Muñoz

## Descripción

La aplicación contiene dos módulos principales:

1. **Registro de Aspirantes (módulo `asp`)** — formulario con validaciones para registrar aspirantes universitarios, vista de administrador con el listado y selección de programa académico.
2. **Simulador de CDT (módulo `cdt`)** — calcula la ganancia, el valor futuro, el impuesto del 4×1000 y la ganancia neta de un Certificado de Depósito a Término según la inversión, la tasa de interés efectiva anual y el plazo en días. Incluye historial de simulaciones.

## Arquitectura (MVC)

```
src/main/java/
├── asp/                       Módulo Aspirantes
│   ├── bean/   AspiranteBean       (Controller)
│   └── modelo/ Aspirante, AspiranteDAO,
│               Persona, ProgAcad, ProgAcadDAO   (Model)
└── cdt/                       Módulo CDT
    ├── bean/   CDTBean              (Controller)
    └── modelo/ CDT, SimulacionCDTDAO (Model + lógica de negocio)

src/main/webapp/
├── index.xhtml         Página de inicio
├── registro.xhtml      Formulario aspirante
├── admin.xhtml         Listado aspirantes
├── cdt.xhtml           Simulador CDT
└── resources/css/estilos.css
```

## Tecnologías

- Java 21
- Jakarta EE 10 / Jakarta Faces (JSF) 4.0.1
- Maven
- Bootstrap 5.3.2
- CDI (Weld)

## Cómo ejecutar

1. Abrir el proyecto en Eclipse IDE for Enterprise Java Developers (importar como proyecto Maven).
2. Configurar un servidor de aplicaciones compatible con Jakarta EE 10 (WildFly 30+, Payara 6+, GlassFish 7+).
3. Ejecutar `Run As → Run on Server` y desplegar el WAR.
4. Abrir en el navegador: `http://localhost:8080/VillamilWeb1/`

## Diagrama de clases

Ver `docs/diagrama_clases_cdt.drawio` (abrir en https://app.diagrams.net o en la extensión Draw.io de VS Code).
