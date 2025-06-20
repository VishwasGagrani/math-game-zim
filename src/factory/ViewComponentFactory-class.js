import { Button, Label, TextArea, Tabs, Container, Rectangle, Circle } from "zimjs";
export default class ViewComponentFactory  {  
      
 
            static createTab =function (
            tabContainer_zcnt,
            tabBtns_Objarr,
            tabSettings_Obj,
             pChangeFun
            )
            {
                  
                  var obj=[];
                  for( var i=0; i< tabBtns_Objarr.length; i++ )
                  obj.push({label:tabBtns_Objarr[i].label_Str});
                  //labelling inverse because tab is rotated at -90
                
                tabSettings_Obj.tabs = obj

                var tabs = new Tabs(tabSettings_Obj); 
                 
                  tabs.on("change", pChangeFun);//tabs
                  //tabContainer_Rect.alpha=pageSettings_Obj.alpha ;//0.85
                  //tabContainer_Rect.x = pageSettings_Obj.x ;// tabSettings_Obj.height ;

                  //tabs.rotation = -90;
                  //tabs.x = 0; tabs.y=tabSettings_Obj.width ; 

                  //tabContainer_Rect.addChild(tabContainer_zcnt);
                  tabs.selectedIndex = 0;

                  return tabs ;

           }//createTabs


            
           static  createButton ( 
             pVal_obj   
             )
            {
                var pData_obj = pVal_obj.data_Obj ;
                 var pPos_obj = pVal_obj.pos_Obj ;
                var pBtn_obj = pVal_obj.btn_Obj;

                var btn = new Button(pBtn_obj);

              if( pData_obj )
             {
              btn.data_Obj = pData_obj ;
             }

                if(pPos_obj) //if position is not provided then leave it
                {
                btn.pos(pPos_obj.dirX,pPos_obj.dirY,pPos_obj.dirXName,pPos_obj.dirYName);
                }
                return btn ;
            }


            static  createLabel ( 
             pVal_obj   
 
              ) 
            {

              var pText_str = pVal_obj.text_Str ;  
              var pEditable_bool = pVal_obj.editable_Bool ;
              var pPassword_bool = pVal_obj.password_Bool;
              var pMaxLength_str = pVal_obj.maxLength_Str;
              var pPlaceholder_str = pVal_obj.placeholder_Str ; 
              var  pColor_str  = pVal_obj.color_Str ;
              var pSize_int = pVal_obj.size_Int ;

              //only for editable text 
              var pWidth_flt = pVal_obj.width_Flt;// || pVal_obj.backing_Obj.width_Flt ;
              var pHeight_flt = pVal_obj.height_Flt ;// ||  pVal_obj.backing_Obj.height_Flt;
              //only for editable text 

              var pFont_str = pVal_obj.font_Str;
              var pAlign_str = pVal_obj.align_Str ;
              var pBacking_obj = pVal_obj.backing_Obj;
              var pParent_mc = pVal_obj.parent_Mc ;
              var url_str  = pVal_obj.url_Str ; 
              var pData_obj = pVal_obj.data_Obj ;
              var pReadOnly_bool = pVal_obj.readOnly_Bool ;




              if(!pColor_str)
              {
                pColor_str = "#000000";
              }
              if(!pSize_int)
              {
                pSize_int = 10;
              }
              
                var defaultTextFormat;
                var label ;

                if( pEditable_bool ) //editable means using html textarea (instead of label )
                { 
                    defaultTextFormat= {

                      //text:pText_str || "",
                      readOnly: pReadOnly_bool,
                      password:pPassword_bool,
                      placeholder:pPlaceholder_str || "",
                      size:pSize_int,
                      wrap:false,
                      maxLength:pMaxLength_str,
                      
                      color:pColor_str || "#000000",
                      width:pWidth_flt,
                      height:pHeight_flt,
                         
                    }
 
                    label = new TextArea(defaultTextFormat);
                    label.tag.style.textAlign = pAlign_str || "left";
                    if(pReadOnly_bool)
                     label.background.borderColor = "rgba(0,0,0,0)"
                    else 
                      label.background.borderColor = "rgba(0,0,0,1)"

                    label.background.color = "rgba(255,255,255,0.5)" ;

                   // label.tag.disabled=true; 

                     label.regX = label.width/2; 
                      label.regY = label.height/2;  

                  }
                 else 
                 if( !pEditable_bool ) //not editable means using zimjs label component 
                 {
                    defaultTextFormat= 
                    {

                       text:pText_str || "",
                      size:pSize_int,
                      font:pFont_str || "arial" ,
                      color:pColor_str || "#000000",
                      align: pAlign_str || "left" ,
                      valign:"middle",  //baseline,middle,top,middle,bottom
                      backing: new Container(1,1) //set to container instead of null to give ability to change back shape on the fly. Otherwie not possible
                    }

                    
                       
                   label = new Label(defaultTextFormat );



                 }
 
                label.defaultTextFormat = defaultTextFormat;

            
                if( pData_obj )
             {
              label.data_Obj = pData_obj ;
             }

                   
                   if(!pEditable_bool) //backing is only for label. 
                {  
                   
                    label.originX =label.x;
                    label.originY = label.y;
 
                     ViewComponentFactory.setAlignment(label,label.originX,label.originY,pWidth_flt,pHeight_flt);
                 
              }


                  if( url_str && url_str.length >=0) 
                  {
                      label.expand(); // bigger hit area 
                      label.rollColor = "#0000FF"; //roll color of text only
                      label.tap(function() {
                        // 3. call zgo() and pass the URL and the target
                        // here we open in same window
                        zgo(url_str,"_blank");
                      });
                  }
               
                return label;

            }


            
            static  setAlignment  (label,px,py,pw,ph)
            {
                            if( !label.originX ) //this happens when textfeild are creatd dynamically
                            {
                                label.originX =px ;
                            }
                            if( !label.originY )
                            {
                                label.originY =py ;
                            }

                        switch( label.align)    
                          {
                             case "left":
                               
                               //label.regX = 0 ; 
                              //label.regY = label.height;   
                              label.x =  label.originX ;//+ pw   ;
                               
                              // label.backing.x  = label.originX; 
                             break;     

                             case "right":
                            
                                label.x =  label.originX  //+pw;// rect.width//-label.width ;
                                //label.backing.x  = label.originX - pw ; 
                             break;     

                             case "center":
                                label.x = label.originX;// +pw/2; //rect.width/2;
                                 //label.backing.x  = label.originX -pw/2; //rect.width/2;
                             break;     
                          }

                          
                           switch( label.valign)    
                          {
                             case "top":
                                 label.y = label.originY +ph/2;
                                  //label.backing.y  = label.originY ;
                             break;     

                             case "bottom":

                                label.y = label.originY + ph ;//rect.height//-label.width ;
                               ///label.backing.y  = label.originY -ph ; //rect.width/2;
                             break;     

                             case "middle":
                                label.y = label.originY;// + ph/2;//rect.height/2;
                                  //label.backing.y  = label.originY -ph/2; //rect.width/2;
                             break;     


                          }
             
                        // zimStage.update();
            }





//NOT WORKING //NOT WORKING //NOT WORKING //NOT WORKING //NOT WORKING //NOT WORKING //NOT WORKING 
            //change the backing of label 
            static  setBacking (pLabel,pBacking_obj)//,pWidth_flt,pHeight_flt)
            {
                   
                      var refinedBacking_obj ={}; 
                  //#guide: don't use pBacking_obj because the property "type" is an impurity for zim-rectangle. 
                  //and it fills the console with warnings.
                  
                  refinedBacking_obj.borderColor =pBacking_obj.borderColor; 
                  refinedBacking_obj.borderWidth =pBacking_obj.borderWidth;
                  refinedBacking_obj.color =pBacking_obj.color;
                  refinedBacking_obj.corner =pBacking_obj.corner;
 
                    if(pBacking_obj.type == "rectangle")
                    { 
                      refinedBacking_obj.width = pBacking_obj.width ;
                      refinedBacking_obj.height = pBacking_obj.height ;
                    }
                    else 
                     if(pBacking_obj.type == "circle") 
                    {
                       refinedBacking_obj.width = pBacking_obj.radius *2 ; 
                       refinedBacking_obj.height = pBacking_obj.radius *2 ; 
                     }

                 if(  !refinedBacking_obj.type ||    refinedBacking_obj.type.toLowerCase() == "rectangle"  )
                  {
                       var backing = new Rectangle(refinedBacking_obj );
                      // pLabel.backing.addChild(rec);
                  }
                  else 
                  if(pBacking_obj.type.toLowerCase() == "circle")  
                  {
                       var backing  = new Circle(pBacking_obj);
                      // c.regX = c.width/2; 
                     //  c.regY = c.height/2;  
                      // pLabel.backing.addChild(c);
                  }

                  pLabel.parent.addChild(  backing );

                     var ci = pLabel.parent.getChildIndex(pLabel);   
                     
                  pLabel.parent.setChildIndex(backing,ci-1);  
                  
                  backing.x = pLabel.x ; 
                  backing.y = pLabel.y ;

                  ViewComponentFactory.setAlignmentForBacking(pLabel,pLabel.x,pLabel.y,pBacking_obj.width,pBacking_obj.height);
                       

                    zimStage.update();

             }//setbacking 
 
             static  setAlignmentForBacking (label,px,py,pw,ph)
            {
                            if( !label.originX ) //this happens when textfeild are creatd dynamically
                            {
                                label.originX =px ;
                            }
                            if( !label.originY )
                            {
                                label.originY =py ;
                            }

                        switch( label.align)    
                          {
                             case "left":
                           
                               label.x =  label.originX  + label.paddingHorizontal ;//label.padding;// + pw   ;
                              break;     

                             case "right":
                            
                                label.x =  pw  - label.paddingHorizontal  ;
                              break;     

                             case "center":
                                label.x = pw/2; 
                                  
                             break;     
                          }

                          
                           switch( label.valign)    
                          {
                             case "top":
                                 label.y = label.originY  + label.height/2 ;//
                                   
                             break;     

                             case "bottom":

                                label.y = label.originY +ph -label.height/2; 
                                
                             break;     

                             case "middle":
                                label.y = label.originY +ph/2 ; 
                              break;     


                          }
             
                          zimStage.update();
            }



  
            static  setTextFormat  (pLabel_lbl,pTxtFmt_Tf )//pSize,pFnt,pAlign,pColor)
{
  

 
  if(pTxtFmt_Tf.text) pLabel_lbl.text = pTxtFmt_Tf.text ;

  if(pTxtFmt_Tf.size) pLabel_lbl.size   = pTxtFmt_Tf.size ;
  if(pTxtFmt_Tf.font) pLabel_lbl.font= pTxtFmt_Tf.font ;
  if(pTxtFmt_Tf.color) pLabel_lbl.color= pTxtFmt_Tf.color; 
  if(pTxtFmt_Tf.align) pLabel_lbl.align= pTxtFmt_Tf.align ;
  if(pTxtFmt_Tf.valign) pLabel_lbl.valign= pTxtFmt_Tf.valign;  
   
  setAlignment(pLabel_lbl,ViewComponentFactory.getX(pLabel_lbl),ViewComponentFactory.getY(pLabel_lbl),pLabel_lbl.labelWidth ,pLabel_lbl.labelHeight2);  
   

  //pLabel_lbl.outline();
  zimStage.update();
}

static  setText (pLabel_lbl, pText )
{
  //pText = "abcdefghij";
    var dtf = pLabel_lbl.defaultTextFormat ;
      pLabel_lbl.text = pText  ;
    pLabel_lbl.size   = dtf.size ;
    pLabel_lbl.font= dtf.font ;
    pLabel_lbl.color= dtf.color; 
    pLabel_lbl.align= dtf.align ;
    pLabel_lbl.valign= dtf.valign;  

    //zog(pLabel_lbl,ViewComponentFactory.getX(pLabel_lbl),ViewComponentFactory.getY(pLabel_lbl),pLabel_lbl.labelWidth ,pLabel_lbl.labelHeight2);
    ViewComponentFactory.setAlignment(pLabel_lbl,ViewComponentFactory.getX(pLabel_lbl),ViewComponentFactory.getY(pLabel_lbl),pLabel_lbl.labelWidth ,pLabel_lbl.labelHeight2);  
   //pLabel_lbl.outline();


zimStage.update();
 
}


static getX  (pLabel_lbl)
{
  return pLabel_lbl.originX ;
}

static  getY (pLabel_lbl)
{
  return pLabel_lbl.originY   ;
}



}