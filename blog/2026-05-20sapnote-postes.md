---
slug: sap-note-3255746-data-integration-es
title: SAP-Compliant Data Extraction with CRESTONE - SAP Note 3255746 (EN)
description: What Every Data Integration Team Needs to Know
authors: [Martin]
tags: [SAP]
---
![Imagen de SAP Note 3255746](/img/blog/note3.png)


## Lo que Todo Equipo de Integración de Datos Debe Saber
Si tu organización extrae datos desde SAP hacia plataformas externas de analítica o almacenamiento, probablemente ya escuchaste hablar de la SAP Note 3255746. Y si no, es momento de prestarle atención: a partir de junio de 2026, SAP comenzará a bloquear técnicamente una de las formas más utilizadas de integración de datos — el acceso ODP vía RFC desde sistemas no-SAP.

<!--truncate-->

En este artículo explicamos qué significa esto en la práctica, qué alternativas existen, y cómo CRESTONE te permite mantener tus pipelines SAP funcionando sin interrupciones y en pleno cumplimiento con las directrices de SAP.

---

## El contexto: ¿Qué está cambiando y por qué?

Históricamente, muchas herramientas de integración de datos utilizaron la ODP Data Replication API (ODP-RFC) para extraer datos desde SAP. El problema es que SAP diseñó esta interfaz exclusivamente para transferencias entre sistemas SAP, no para conectar SAP con herramientas externas como plataformas de BI, data warehouses o data lakes.

Con la Versión 11 de la nota, publicada el **21 de abril de 2026**, SAP formalizó esta restricción con términos más claros y directos:

- ODP-RFC es para uso **exclusivo entre aplicaciones SAP**.
- Su uso por parte de herramientas o desarrollos de terceros en entornos on-premises o nube privada está **explícitamente prohibido**.
- Cualquier incidente derivado del uso no autorizado de ODP-RFC es **responsabilidad del cliente**, no de SAP.

A esto se suma que en **junio de 2026** SAP implementará un parche de seguridad que bloqueará automáticamente las llamadas ODP-RFC provenientes de sistemas externos. Es decir, no se trata de una recomendación — es un cambio técnico que dejará las integraciones no conformes sin funcionar. El momento ideal para revisar y adaptar la arquitectura de integración es ahora, con tiempo suficiente para hacerlo ordenadamente.

---

## Una aclaración importante

Aquí vale detenerse un momento, porque este punto genera mucha confusión.

**La nota no prohíbe RFC como protocolo.** RFC sigue siendo un mecanismo de comunicación completamente válido y seguirá funcionando. Lo que se restringe es únicamente la **ODP Data Replication API cuando se accede vía RFC desde aplicaciones externas a SAP**.

Esto significa que si hoy extraes datos usando tablas, vistas CDS, BAPIs o módulos de función a través de RFC, esas integraciones **no están afectadas** y pueden continuar sin cambios.

---

## ¿Cómo saber si estás expuesto?

SAP publicó la **Note 3439624**, que incluye una herramienta de autoevaluación automatizada. Esta herramienta permite auditar el uso de ODP-RFC en tu landscape de sistemas y es el punto de partida recomendado para cualquier organización que quiera entender su exposición real antes de actuar.

CRESTONE también cuenta con una función de cumplimiento integrada que permite identificar directamente qué extracciones configuradas en la plataforma utilizan ODP, sin necesidad de revisar configuración por configuración manualmente.

---

## Las alternativas: qué usar en lugar de ODP-RFC

El mensaje principal que hay que retener es este: **ODP-RFC se reemplaza, no la integración SAP en su conjunto**. CRESTONE ofrece varios componentes que cubren los mismos casos de uso de manera eficiente y totalmente conforme con SAP:

**Table con soporte CDS View** es la opción natural cuando las extracciones actuales están basadas en vistas ABAP CDS. Permite acceso directo a estas vistas, incluyendo variantes con parámetros y entidades CDS, sin pasar por ODP.

CRESTONE ofrece tres mecanismos para la captura de cambios (delta), todos operando por fuera de ODP-RFC y sin acceso directo a base de datos:

**Table CDC** detecta Inserts y Updates a nivel de tabla mediante lógica incremental basada en columnas de control (timestamp, campo de modificación). Es el mecanismo recomendado para la mayoría de los escenarios de replicación de tablas SAP.

**Delta nativo de Extractors vía ODP OData:** cuando el Extractor/Datasource SAP es delta-capable y ha sido expuesto como servicio OData, CRESTONE puede aprovechar su mecanismo de delta nativo para obtener únicamente los registros nuevos o modificados desde la última extracción.

**Variables de fecha en CRESTONE:** para objetos fuente que no soportan delta nativo, CRESTONE permite configurar variables de fecha que filtran los registros en cada ejecución basándose en campos de fecha/hora del objeto fuente en SAP. Esta lógica es gestionada íntegramente desde CRESTONE, sin requerir modificaciones en el sistema SAP.

**ODP OData** permite acceder a Extractors/Datasources SAP que hayan sido expuestos como servicios OData desde el lado SAP (vía transacción SEGW). Este mecanismo utiliza HTTP/OData — no ODP-RFC — por lo que es completamente conforme con la nota. Requiere que el equipo de SAP Basis del cliente cree y publique el servicio OData correspondiente por cada objeto fuente; CRESTONE se conecta al servicio una vez disponible. Es importante verificar que el extractor esté habilitado para ODP en RSA5/RSA6 y que el componente SAP Gateway Foundation (SAP_GWFND) esté instalado.

---

## Tabla de referencia: objetos fuente y sus alternativas en CRESTONE

| Objeto fuente ODP                   | Alternativa recomendada           |
|-------------------------------------|-----------------------------------|
| ABAP Core Data Services [ABAP_CDS]  | Table con CDS View                |
| Datasources / Extractors [SAPI]     | ODP OData (requiere configuración en SAP Basis) |
| SAP LT Queue Alias [SLT]            | Table, Table CDC                  |

Todos los demás componentes de CRESTONE — Table, Table CDC, BAPI y Query — **no están afectados por la nota y pueden seguir operando sin restricciones**.

---

## Plan de acción: tres pasos concretos

**Paso 1 — Diagnosticar antes de migrar.**
Usa la herramienta de SAP Note 3439624 para mapear el uso de ODP-RFC en tu sistema. En paralelo, revisa desde CRESTONE qué extracciones activas utilizan ODP. Sin este diagnóstico, cualquier plan de migración será incompleto.

**Paso 2 — Priorizar por impacto.**
No todas las extracciones tienen el mismo peso en producción. Identifica cuáles son críticas y comienza la migración por ahí, dejando los casos menos urgentes para una segunda fase.

**Paso 3 — Elegir el componente correcto para cada caso.**
Siguiendo la lógica de la tabla anterior: vistas CDS → Table con CDS View; replicación de tablas → Table CDC; Extractors/Datasources → ODP OData (previa publicación del servicio por SAP Basis).

---

## En resumen

La SAP Note 3255746 no es una amenaza para la integración de datos SAP — es una oportunidad para ordenar y modernizar la arquitectura de extracción. Las alternativas disponibles en CRESTONE no solo cumplen con las nuevas directrices, sino que en la mayoría de los casos ofrecen mayor rendimiento y menor complejidad operativa que ODP-RFC.

El tiempo para actuar es ahora. El parche de junio de 2026 no va a esperar, y una migración bien planificada es mucho menos costosa que una interrupción en producción.

---

## Preguntas frecuentes

**¿Las extracciones de tablas que ya tengo configuradas se ven afectadas?**
No. Table, Table CDC, BAPI y Query no están afectados por la nota.

**¿Puedo seguir usando ODP vía RFC mientras espero migrar?**
Técnicamente sí, hasta junio de 2026. Pero a partir del parche de seguridad, las llamadas no autorizadas serán bloqueadas activamente. No es recomendable dejar esto para último momento.

**¿Qué tan complejo es migrar a ODP OData para Extractors?**
Requiere que SAP Basis cree y publique un servicio OData por cada objeto fuente desde la transacción SEGW. Una vez publicado el servicio, CRESTONE puede conectarse a él sin mayor complejidad. Es importante verificar previamente que el extractor esté habilitado para ODP y que SAP Gateway Foundation esté instalado.

**¿RFC como protocolo sigue funcionando?**
Sí, completamente. La nota no afecta RFC en general, solo el uso específico de la ODP Data Replication API vía RFC desde sistemas externos.

**¿Cómo identifico mis extracciones ODP en CRESTONE?**
CRESTONE cuenta con una función de cumplimiento integrada que muestra todas las extracciones activas basadas en ODP, permitiéndote actuar de forma inmediata y precisa.

---

*¿Tienes dudas sobre cómo aplica esto a tu landscape de sistemas? El equipo de SEIDOR Analytics puede ayudarte a evaluar tu situación y definir el camino de migración más adecuado.*
