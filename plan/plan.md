## Plan

### 1. Add phone number to the Team page "Add Member" dialog

The phone field already exists on `OnboardingPage.tsx` and in the `create-member` edge function, but the dialog shown in your screenshot lives in `src/pages/TeamPage.tsx` and is missing the field.

Changes in `src/pages/TeamPage.tsx`:
- Add `memberPhone` state alongside the other member fields.
- Add a "Phone Number" input (with `Phone` icon, `type="tel"`) between Department and System Role inside the dialog grid.
- Pass `phone: memberPhone` in the `supabase.functions.invoke('create-member', …)` call.
- Reset `memberPhone` after successful creation.
- Update the helper text under the button to: "A verification email will be sent — the member must confirm before they can log in." (matches the new email-verification flow we shipped.)

No DB or edge-function changes — `profiles.phone` and the function already accept it.

### 2. Per-task documents page (link from assigned tasks)

A new in-app route lets an assignee open a task and upload supporting files in one place.

- New route: `/tasks/:taskId/documents` registered in `src/App.tsx`.
- New page `src/pages/TaskDocumentsPage.tsx`:
  - Loads the task (title, project, status, assignees).
  - Guards access: assignee, creator, admin, or manager.
  - Uses the existing `task-attachments` storage bucket and `task_attachments` table — no new schema.
  - Drag-and-drop + file picker upload, list of existing attachments with download/delete (own-or-admin).
  - Breadcrumb back to the parent project.
- Task surfaces get an "Upload documents" link/button:
  - Task detail dialog in `TasksPage.tsx` and the Kanban/list cards (small paperclip icon when count > 0).
  - The notification trigger `notify_task_changes` already inserts a `link` like `/projects/:pid?task=:tid`; we'll add a secondary "Open documents" action in the notification dropdown that routes to `/tasks/:tid/documents`.

### 3. Merging the hivemind-hub project

You chose "move it into this workspace + @mention it." Once you've done that, re-send the request with `@nexubotics-hivemind-hub` so I can read its files. The merge plan will then be:

- Inventory hivemind-hub: routes, components, supabase tables, edge functions, storage buckets.
- Map overlaps (auth, profiles, storage) onto NEXUBOTICS so we don't duplicate tables.
- Copy over the upload-documents UI/components (likely the cleanest pieces to reuse) into NEXUBOTICS as the implementation of `/tasks/:taskId/documents`, replacing the simple uploader from step 2 with the richer hivemind-hub flow.
- Migrate any hivemind-hub-only data via SQL migration if needed.
- Wire its routes under NEXUBOTICS' existing layout/sidebar.

I'll deliver a follow-up plan after you grant access — the scope depends on what's in that project.

### Out of scope for this round
- Changing notification copy/structure beyond the new "Open documents" action.
- Any changes to the verified/pending pipeline.
