function make_dynamic_lattice(i0,j0,type){'use strict';var counter={};counter[i0]={};counter[i0][j0]=1;var i_max=i0;var i_min=i0;var j_max=j0;var j_min=j0;var type=type;function add_one_to_counter(i,j){if(typeof counter[i]==='undefined'){counter[i]={};if(i>i_max){i_max=i}
if(i<i_min){i_min=i}
if(typeof counter[i][j]==='undefined'){counter[i][j]=1;if(j>j_max){j_max=j}
if(j<j_min){j_min=j}
return 1;}else{if(type==1){counter[i][j]++;return 1;}
return 0;}}else{if(typeof counter[i][j]==='undefined'){counter[i][j]=1;if(j>j_max){j_max=j}
if(j<j_min){j_min=j}
return 1;}else{if(type==1){counter[i][j]++;return 1;}
return 0;}}}
return{add_one_to_counter:add_one_to_counter,get_counter_val:function(i,j){if(typeof counter[i]==='undefined'){return 0}
if(typeof counter[i][j]==='undefined'){return 0}
return counter[i][j];},get_bounding_box:function(){return[i_min,j_min,i_max,j_max]}}}
function generate_polymer(polymer_length,type,biased){let idx_0=(polymer_length/2)|0;var monomer_i=[idx_0];var monomer_j=[idx_0];var rede=make_dynamic_lattice(idx_0,idx_0,type);var weight=1;if(biased){let movement_types=[0,1,2,3];let ell=1;while(ell<polymer_length&&movement_types.length>0){let idx=(Math.random()*movement_types.length|0);let[move]=movement_types.splice(idx,1);let i0=monomer_i[ell-1];let j0=monomer_j[ell-1];let i=i0;let j=j0;if(move==0){i++;}else if(move==1){i--;}else if(move==2){j++;}else{j--;}
if(rede.add_one_to_counter(i,j)==1){monomer_i[ell]=i;monomer_j[ell]=j;ell++;if(type==0){let partial_weight=3;if(move==0){partial_weight-=rede.get_counter_val(i0,j0+1)+rede.get_counter_val(i0,j0-1);movement_types=[0,2,3];}else if(move==1){partial_weight-=rede.get_counter_val(i0,j0+1)+rede.get_counter_val(i0,j0-1);movement_types=[1,2,3];}else if(move==2){partial_weight-=rede.get_counter_val(i0+1,j0)+rede.get_counter_val(i0-1,j0);movement_types=[0,1,2];}else{partial_weight-=rede.get_counter_val(i0+1,j0)+rede.get_counter_val(i0-1,j0);movement_types=[0,1,3];}
weight*=partial_weight/3.0;}else{weight=1;movement_types=[0,1,2,3];}}}}else{let movement_types=[0,1,2,3];let ell=1;while(ell<polymer_length){let idx=(Math.random()*movement_types.length|0);let[move]=movement_types.splice(idx,1);let i=monomer_i[ell-1];let j=monomer_j[ell-1];if(move==0){i++;movement_types=[0,2,3];}else if(move==1){i--;movement_types=[1,2,3];}else if(move==2){j++;movement_types=[0,1,2];}else{j--;movement_types=[0,1,3];}
if(rede.add_one_to_counter(i,j)==1){monomer_i[ell]=i;monomer_j[ell]=j;ell++;if(type==1)movement_types=[0,1,2,3];}else{break}}}
let R2L=(monomer_i[monomer_i.length-1]-monomer_i[0])**2+
(monomer_j[monomer_j.length-1]-monomer_j[0])**2;return{i:monomer_i,j:monomer_j,type:type,weight:weight,lattice:rede,length:monomer_i.length,R2L:R2L}}
function generate_fixed_length_polymer(polymer_length,type,biased,iteration_limit){let target_length=0;let cont=0;let success=0;let polymer_chain;while(target_length!=polymer_length&&cont<iteration_limit){polymer_chain=generate_polymer(polymer_length,type,biased);target_length=polymer_chain.length;cont++;}
polymer_chain['cont']=cont;if(polymer_chain.length==polymer_length)success=1;return[polymer_chain,success];}
function count_this_box(rede,size,i0,j0){for(let ix=i0;ix<i0+size;ix++){for(let jx=j0;jx<j0+size;jx++){if(rede.get_counter_val(ix,jx))return 1;}}
return 0;}
function box_counting(rede,size){let bbox=rede.get_bounding_box();var boxes_i=[];var boxes_j=[];for(let i=bbox[0];i<=bbox[2];i+=size){for(let j=bbox[1];j<=bbox[3];j+=size){if(count_this_box(rede,size,i,j)==1){boxes_i.push(i);boxes_j.push(j);}}}
return{size:size,count:boxes_i.length,i:boxes_i,j:boxes_j}}
function polsimFF(){'use strict';var polymer_length=2;var polymer_type=0;var biased_flag=undefined;var iteration_limit=10000;var area_measure_size=1;var last_area_measure_size=1;var phys_polymer;var radius=Math.ceil(window.screen.width/4000);var view_frame;var canvas;var context;var my_width=500;var my_height=500;var polymer_group;var boxes_group;var center_i;var center_j;var view_scale_factor=1;var view_trans_factor_x=0;var view_trans_factor_y=0;function undraw_polymer(){if(polymer_group.lastChild){polymer_group.removeChildren();context.clearRect(0,0,canvas.width,canvas.height);}}
function calc_scale(){let scale=my_width/(0.88*polymer_length**0.75)|0;if(scale>20)scale=20;if(scale<8)scale=8;return scale;}
function draw_polymer(polymer_chain,dummy_scale){let scale;if(typeof dummy_scale==='undefined'){scale=calc_scale();}else{scale=dummy_scale;}
let caminho=new Path;caminho.strokeColor='black';polymer_group.addChild(caminho);center_i=polymer_chain.i[0];center_j=polymer_chain.j[0];for(var ell=0;ell<polymer_chain.i.length;ell++){let i=my_width/2+(center_i-polymer_chain.i[ell])*scale;let j=my_height/2+(center_j-polymer_chain.j[ell])*scale;let circle=new Path.Circle(new Point(i,j),scale/4);polymer_group.addChild(circle);caminho.add(new Point(i,j));if(ell==0){circle.fillColor='#4e9a06';circle.scaling=1.3;}else if(ell==polymer_chain.i.length-1){circle.fillColor='#ef2929';}else{circle.fillColor='#ce5c00';}}
polymer_group.scale(view_scale_factor);polymer_group.translate(new Point(view_trans_factor_x,view_trans_factor_y));}
function draw_boxes(boxes,dummy_scale){'use strict';let scale;let box_size=boxes.size;if(boxes_group.lastChild&&box_size==last_area_measure_size){console.log("ENTROU!");return;}
last_area_measure_size=box_size;if(typeof dummy_scale==='undefined'){scale=calc_scale();}else{scale=dummy_scale;}
for(var ell=0;ell<boxes.i.length;ell++){let i1=my_width/2+(center_i-boxes.i[ell]-(2*box_size-1)/2)*scale;let j1=my_height/2+(center_j-boxes.j[ell]-(2*box_size-1)/2)*scale;let i2=i1+box_size*scale;let j2=j1+box_size*scale;let rect=new Path.Rectangle(new Rectangle(new Point(i1,j1),new Point(i2,j2)));rect.fillColor='#fce94f';rect.strokeColor='black';boxes_group.addChild(rect);}
boxes_group.scale(view_scale_factor);boxes_group.translate(new Point(view_trans_factor_x,view_trans_factor_y));}
function undraw_boxes(){if(boxes_group.lastChild){boxes_group.removeChildren();context.clearRect(0,0,canvas.width,canvas.height);}}
function scale_view(factor){if(factor<=0)factor=1;polymer_group.scale(factor);boxes_group.scale(factor);view_scale_factor*=factor;}
function translate_view(dx,dy){polymer_group.translate(new Point(dx,dy));if(boxes_group.lastChild){boxes_group.translate(new Point(dx,dy));}
view_trans_factor_x+=dx;view_trans_factor_y+=dy;}
function setup_paper_view(canvas_id){canvas=document.getElementById(canvas_id);context=canvas.getContext('2d');paper.setup(canvas_id);view_frame=new Path.Rectangle(new Point(0,0),new Size(my_width,my_height));view_frame.strokeColor='black';canvas.height=my_height;canvas.width=my_width;boxes_group=new Group();polymer_group=new Group();}
function run(){'use strict';clear_all_fields();view_trans_factor_x=0;view_trans_factor_y=0;polymer_hdl.undraw_polymer();undraw_boxes();deh_polymer_messages.css('display','none');document.body.style.cursor='wait';let success;[phys_polymer,success]=generate_fixed_length_polymer(self.get_length(),self.get_type(),self.get_biased_flag(),self.get_iteration_limit());document.body.style.cursor='default';if(!success){deh_polymer_messages.css('display','');deh_polymer_messages.html("<span style='color:red;'><strong>AVISO:</strong> Esgotado número de iterações sem atingir comprimento L especificado! Polímero gerado com L<sub>g</sub> = "+`${phys_polymer.length}`+' monômeros.</span>');}
deh_squared_radius.html(phys_polymer.R2L);deh_iterations.html(phys_polymer.cont);let weight=phys_polymer.weight;if(weight<1)weight=(weight).toExponential(3);deh_weight.html(weight);deh_area.html('');polymer_hdl.draw_polymer(phys_polymer);}
function count_boxes(){'use strict';if(!polymer_group.lastChild)return;self.undraw_boxes();let box_size=self.get_area_measure_size();let myboxes=box_counting(phys_polymer.lattice,box_size);deh_area.html(myboxes.count);self.draw_boxes(myboxes);}
var self={setup:setup_paper_view,set_length:function(val){if(val>10000){val=10000;deh_length_sel.val(val)}
polymer_length=val},get_length:function(){return polymer_length},set_type_and_algorithm:function(sel){if(sel==1){polymer_type=0;biased_flag=undefined;return};if(sel==2){polymer_type=0;biased_flag=1;return};if(sel==3){polymer_type=1;biased_flag=undefined;return};},get_type:function(){return polymer_type},set_iteration_limit:function(val){if(val>500000){val=500000;deh_iteration_limit_sel.val(val);}
iteration_limit=val},get_iteration_limit:function(){return iteration_limit},get_biased_flag:function(val){return biased_flag},set_area_measure_size:function(val){if(Number(val)>self.get_length()/2){val=self.get_length()/2|0;deh_area_measure_size_sel.val(val)}
if(Number(val)<=0){val=1;deh_area_measure_size_sel.val(1)}
area_measure_size=val|0;},get_area_measure_size:function(){return area_measure_size},get_polymer:function(){return phys_polymer},draw_polymer:draw_polymer,draw_boxes:draw_boxes,undraw_polymer:undraw_polymer,undraw_boxes:undraw_boxes,run:run,count_boxes:count_boxes,scale_view:scale_view,translate_view:translate_view}
return self;}