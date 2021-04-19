#pragma strict
var grounded:boolean=false;
function Update(){
if(grounded){
GetComponent.<Rigidbody>().AddForce(Vector3.up*1000);
grounded=false;
}
}
function OnCollisionEnter(){
 grounded=true;
}