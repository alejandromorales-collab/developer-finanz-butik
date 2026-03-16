# PLANIGN — Revisión del Plan Finanz Butik

## Resumen ejecutivo

Plan para crear el ecosistema del stakeholder **Vendors** en Finanz Butik: dominio de proveedores de servicios (legales, contables, etc.), backend API, moderación admin y marketplace básico.

---

## Tabla gerencial del plan

| # | Fase | Alcance | Entregables | Complejidad |
|---|------|---------|-------------|-------------|
| 1 | **Hora 1** — Dominio y modelo | Definir el dominio y el modelo de negocio Vendors | Entidades de dominio, relaciones, flujos de estado (Vendor y Service), modelo PostgreSQL | Media |
| 2 | **Hora 2** — Backend base | Estructura del proyecto | Proyecto Python + FastAPI + SQLAlchemy + PostgreSQL + Pydantic; capas api, services, repositories, models, schemas | Media |
| 3 | **Hora 3** — Modelos y DTOs | Modelos SQLAlchemy y schemas Pydantic | Modelos Vendor y Service con campos definidos; estados pending/approved/rejected (Vendor) y draft/pending/published/rejected (Service) | Baja |
| 4 | **Hora 4** — Lógica de negocio | Service Layer | `VendorService`: register_vendor, get_vendor, update_vendor; `ServiceService`: create_service, update_service, submit_service_for_review, publish_service, list_services | Alta |
| 5 | **Hora 5** — API | Endpoints FastAPI | POST/GET/PATCH vendors; POST/GET/PATCH services; POST submit; GET marketplace | Media |
| 6 | **Hora 6** — Admin | Moderación administrador | PATCH approve/reject para vendors y services | Media |
| 7 | **Hora 7** — UI mínima | Frontend React | Páginas: registro vendor, dashboard, crear servicio, mis servicios, listado marketplace (React + TypeScript + Tailwind + Axios) | Alta |
| 8 | **Hora 8** — Test flujo completo | Validación E2E | Flujo: registro → aprobación admin → crear servicio → submit → aprobación admin → visible en marketplace | Media |

---

## Detalle por complejidad (ordenado de mayor a menor)

| Complejidad | Fase(s) | Razón |
|-------------|---------|-------|
| **Alta** | Hora 4 — Lógica de negocio | Reglas: vendor aprobado antes de publicar; submit para revisión; aprobación admin. Orquestación entre VendorService y ServiceService. |
| **Alta** | Hora 7 — UI mínima | 5 páginas, integración con API, estados de UI, manejo de errores, flujos de aprobación y submit. |
| **Media** | Hora 1, 2, 5, 6, 8 | Dominio conceptual, arquitectura, múltiples endpoints, permisos admin, pruebas E2E. |
| **Baja** | Hora 3 — Modelos y DTOs | Definición de estructuras de datos sin lógica de negocio compleja. |

---

## Dependencias entre fases

| Fase | Requiere |
|------|----------|
| Hora 2 | Hora 1 (dominio definido) |
| Hora 3 | Hora 2 (estructura del proyecto) |
| Hora 4 | Hora 3 (modelos y DTOs) |
| Hora 5 | Hora 4 (servicios) |
| Hora 6 | Hora 5 (API base) |
| Hora 7 | Hora 5–6 (API consumible) |
| Hora 8 | Hora 1–7 (flujo completo implementado) |

---

## Resultado esperado al final

- Vendor onboarding
- Creación de servicios
- Moderación admin
- Marketplace básico

Cubre: registro, publicación de servicios, contacto con clientes, aprobación administrativa.

---

## Inconsistencias, dependencias y riesgos de bloqueo

### Inconsistencias

| Tipo | Descripción | Impacto |
|------|-------------|---------|
| Ruta de API | `PATCH /services/{id}` vs `PATCH /vendors/{vendor_id}/services/{id}`: no está explícito que el vendor solo pueda editar sus propios servicios. | Riesgo de seguridad y UX |
| Submit | Hora 5 habla de `POST /services/{id}/submit`; Hora 4 usa `submit_service_for_review`. Falta clarificar si es POST, PATCH o endpoint dedicado. | Posible confusión en implementación |
| Alcance "contacto con clientes" | En el resultado se menciona “contacto con clientes” para vendors, pero no aparece en las 8 horas (no hay mensajería, inbox, etc.). | Gap de alcance |

### Dependencias externas no planificadas

| Dependencia | Descripción |
|-------------|-------------|
| Variables de entorno | `.env` para DB, API URL y otros secretos no se mencionan |
| CORS | Configuración CORS en FastAPI para consumo desde React no está definida |


### Riesgos de bloqueo

| Riesgo | Probabilidad | Mitigación sugerida |
|--------|--------------|---------------------|
| Sin auth, admin y vendor no diferenciables | Alta | Agregar fase 0.5 o extender Hora 6: auth básica (JWT) y roles |
| 8 horas insuficientes para todo el flujo | Media | Priorizar backend (Hora 1–6) y UI mínima esencial |
| DB no configurada al inicio | Media | Incluir setup PostgreSQL y migraciones en Hora 2 |
| Errores de integración frontend–backend | Media | Definir contrato OpenAPI/Swagger en Hora 5 y validarlo antes de Hora 7 |

---

*Documento generado como revisión del plan del Lab Finanz — Ecosistema Vendors.*
