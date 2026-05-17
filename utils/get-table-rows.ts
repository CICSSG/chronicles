export async function GetTableRows(){
  return fetch("/api/admin/table-rows");
}