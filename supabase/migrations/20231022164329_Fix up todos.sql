alter table "public"."todos" add column "user_id" uuid not null;

alter table "public"."todos" add constraint "todos_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."todos" validate constraint "todos_user_id_fkey";

create policy "Enable all for users based on user_id"
on "public"."todos"
as permissive
for all
to public
using ((auth.uid() = user_id));



