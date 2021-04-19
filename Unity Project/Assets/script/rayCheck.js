#pragma strict
var hit_info:RaycastHit;
function check(hit:Vector3){
if(hit==Vector3.zero==false){
transform.LookAt(hit);
if(Physics.Raycast(transform.position,transform.TransformDirection(Vector3.forward),hit_info,10)){
transform.SendMessageUpwards("getNormal",hit_info.normal);
}
}
}
function swim(m:Vector3){
transform.rotation.eulerAngles=Vector3(transform.parent.Find("Main Camera").GetComponent(Transform).rotation.eulerAngles.x,transform.parent.transform.rotation.eulerAngles.y,0);
transform.SendMessageUpwards("swimDir",transform.TransformDirection(m));

}