#pragma strict
var animator:Animator;
var animatorInfo:AnimatorStateInfo;
var speed:float=10;
var movedirection:Vector3=Vector3.zero;
var co:CharacterController;
var fwd:Vector3=Vector3.zero;
var y:float;
var move:boolean=false;
var gravity:float=10;
var velocity:Vector3;
var JumpGrounded:boolean;
JumpGrounded=true;
var timer1:float=0;

gravity=10;
var timer2:float=0;
var Grounded:boolean=false;
var SphereHit:RaycastHit;

var limit:float;
var force:float;
var slipingDir:Vector3;
var jumping:boolean=false;
var normal:Vector3;
var JumpDir:Vector3;
var DirToStandingGround:Vector3;
var inWater:boolean=false;
function Start(){
animator=GetComponent(Animator);
}
function FixedUpdate () {
move=true;
animatorInfo=animator.GetCurrentAnimatorStateInfo(0);
 inWater=inWater_T(); 
 if(inWater){
 Grounded=true;

 }
 else{
 //if(Physics.SphereCast(transform.position-Vector3.up,0,Vector3.forward,SphereHit,0.1)||){
 Grounded=co.isGrounded;
 //}
 //else{
 //Grounded=false;
 //}
 normal_P(0,Vector3.zero);
 }
 
 

 timer1+=Time.deltaTime; 
 timer2-=Time.deltaTime;
 movedirection=new Vector3(Input.GetAxis("Horizontal"),0,Input.GetAxis("Vertical"));

 if(movedirection==Vector3.zero){
 if(Grounded){
 move=false;
 }
 }

 if(movedirection.x==0==false&&movedirection.z==0==false){
 movedirection*=Mathf.Sqrt(0.5);

 }
 

 //movedirection=movedirection.z*transform.TransformDirection(Vector3.forward)+movedirection.x*transform.TransformDirection(Vector3.right);
 
 if(inWater){
 transform.BroadcastMessage("swim",movedirection);
 velocity.x=movedirection.x*speed;
 velocity.z=movedirection.z*speed;
 velocity.y=movedirection.y*speed; 
 }
 else{
 movedirection=transform.TransformDirection(movedirection);
 JumpDir=Vector3(normal.x,0,normal.z)*0.2+movedirection+Vector3.up;
 force=1/Mathf.Sqrt(Mathf.Pow(JumpDir.x,2)+Mathf.Pow(JumpDir.z,2));
 if(force<1){
 JumpDir.x*=force;
 JumpDir.z*=force;
 }
 if(Grounded){
 if(limit>55==false){
 if(move){
 velocity.x+=movedirection.x*speed;
 velocity.z+=movedirection.z*speed; 
 }
 }
 if(limit>55){
 
 slipingDir=Vector3(normal.x,0,normal.z);
 
 velocity.x+=slipingDir.x*2+movedirection.x*speed*0.1;
 velocity.z+=slipingDir.z*2+movedirection.z*speed*0.1;
 
 }
 }
 }
 if(inWater){
 
 if(Input.GetKey("space")){
 if(Input.GetKey("left shift")==false&&Input.GetKey("right shift")==false){
 velocity.y=10;
 }
 }
 else{
 if(Input.GetKey("left shift")||Input.GetKey("right shift")){
 velocity.y=-10;
 }
 }
 velocity.y-=gravity*Time.deltaTime*0.8;
 }
 else{
 if(Grounded){


 if(JumpGrounded==false){
 JumpGrounded=true;
 timer1=0;
 }
 if(Input.GetKey("space")&&JumpGrounded&&timer1>0.2&&animatorInfo.IsName("Base Layer.idle")){
 animator.SetBool("jump",true);
 
 JumpGrounded=false;
 jumping=true;
 velocity=6*JumpDir;
 timer2=0.5;
 }
 else{
 animator.SetBool("jump",false);
 }
 }
 else{
 animator.SetBool("jump",false);
 } 
 
 if(Input.GetKey("space")==false){
 velocity.y-=gravity*Time.deltaTime;
 }
 else{
 if(timer2<0){
 velocity.y-=gravity*Time.deltaTime;
 }
 else{
 velocity.y-=gravity*Time.deltaTime*0.8;
 }
 }
 }
 if(inWater){
 if(velocity.y>98-transform.position.y){
 velocity.y=98-transform.position.y;
 }
 }
 co.Move(velocity*Time.deltaTime);
 animator.SetFloat("speed",10);
 if(velocity.y<0||velocity.y==0){
 jumping=false;
 }
 if(co.isGrounded){
 if(jumping==false){
 velocity=Vector3.zero;
 }
 }

 //L=180-(Mathf.Abs(Mathf.Atan(normal.y/normal.x))+Mathf.Abs(Mathf.Atan(normal.y/normal.z)))*Mathf.Rad2Deg;
 //L=Mathf.Tan(limit)*Mathf.PI/180;
 //deg_x=90-(Mathf.Atan(Mathf.Abs(normal.y/normal.x))*Mathf.Rad2Deg);
 //deg_z=90-(Mathf.Atan(Mathf.Abs(normal.y/normal.z))*Mathf.Rad2Deg);
 //L=Mathf.Sqrt(Mathf.Pow(deg_x,2)+Mathf.Pow(deg_z,2));
 limit=Vector3.Angle(normal,Vector3.up);
 
}


function normal_P(d:float,hit:Vector3){
if(Physics.SphereCast(transform.position-Vector3.up,0,Vector3.down,SphereHit,5)){
hit=SphereHit.point;
d=SphereHit.distance;
}
if(Physics.SphereCast(transform.position-Vector3.up,0,Vector3.forward,SphereHit,5)){
if(SphereHit.distance<d){
hit=SphereHit.point;
d=SphereHit.distance;
}
}
if(Physics.SphereCast(transform.position-Vector3.up,0,Vector3.back,SphereHit,5)){
if(SphereHit.distance<d){
hit=SphereHit.point;
d=SphereHit.distance;
}
}
if(Physics.SphereCast(transform.position-Vector3.up,0,Vector3.left,SphereHit,5)){
if(SphereHit.distance<d){
hit=SphereHit.point;
d=SphereHit.distance;
}
}
if(Physics.SphereCast(transform.position-Vector3.up,0,Vector3.right,SphereHit,5)){
if(SphereHit.distance<d){
hit=SphereHit.point;
d=SphereHit.distance;
}
}
transform.BroadcastMessage("check",hit);

}
function getNormal(n:Vector3){
normal=n;
}
function inWater_T(){
if(transform.position.y<98){
return true;
}
else{
return false;
}
}
function swimDir(Dir:Vector3){
 movedirection=Dir;
}

@script RequireComponent(CharacterController)

