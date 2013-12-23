$(function () {
    //,"contextmenu"
    //,"dnd"
    $("#"+DCFilebrowser_containerId).jstree({
            // List of active plugins
            "plugins" : [
                "themes","json_data","ui","crrm","search","types","contextmenu","dnd"
            ],
        "themes" : {
            "theme" : DCFilebrowser_theme
            
        },
            // I usually configure the plugin that handles the data first
            // This example uses JSON as it is most common
            "json_data" : {
                // This tree is ajax enabled - as this is most common, and maybe a bit more complex
                // All the options are almost the same as jQuery's AJAX (read the docs)
                "ajax" : {
                    // the URL to fetch the data
                    "url" : "index.php",
                    // the `data` function is executed in the instance's scope
                    // the parameter is the node being loaded 
                    // (may be -1, 0, or undefined when loading the root nodes)
                    "data" : function (n) {
                        // the result is fed to the AJAX request `data` option
                        return {
                            "r" : DCFilebrowser_controller+"/DCGetFileList",
                            "pathTofileListDirectory" : n.attr ? n.attr("path") : DCFilebrowser_rootDir
                            //"../generatedFiles/DogsHoroscope/de/2038-01-01"
                        };
                    }
                }
            },
            // Configuring the search plugin
            "search" : {
                // As this has been a common question - async search
                // Same as above - the `ajax` config option is actually jQuery's AJAX object
                "ajax" : {
                    "url" : "./server.php",
                    // You get the search string as a parameter
                    "data" : function (str) {
                        return {
                            "operation" : "search",
                            "search_str" : str
                        };
                    }
                }
            },
            "contextmenu": {
               
                    select_node : false, // requires UI plugin
                    show_at_node : true,
                    items : { // Could be a function that should return an object like this one
                        "create" : {
                            "separator_before"	: false,
                            "separator_after"	: true,
                            "label"				: "Create New",
                            "action"			: function (obj) { this.create(obj); }
                        },
                        "rename" : {
                            "separator_before"	: false,
                            "separator_after"	: false,
                            "label"				: "Rename",
                            "action"			: function (obj) { this.rename(obj); }
                        },
                        "remove" : {
                            "separator_before"	: false,
                            "icon"				: false,
                            "separator_after"	: false,
                            "label"				: "Delete",
                            "action"			: function (obj) { if(this.is_selected(obj)) { this.remove(); } else { this.remove(obj); } }
                        },
                        
                        "ccp" : {
                            "separator_before"	: true,
                            "icon"				: false,
                            "separator_after"	: false,
                            "label"				: "Edit",
                            "action"			: false,
                            "submenu" : {
                                "cut" : {
                                    "separator_before"	: false,
                                    "separator_after"	: false,
                                    "label"				: "Cut",
                                    "action"			: function (obj) { this.cut(obj); }
                                },
                                "copy" : {
                                    "separator_before"	: false,
                                    "icon"				: false,
                                    "separator_after"	: false,
                                    "label"				: "Copy",
                                    "action"			: function (obj) { this.copy(obj); }
                                },
                                "paste" : {
                                    "separator_before"	: false,
                                    "icon"				: false,
                                    "separator_after"	: false,
                                    "label"				: "Paste",
                                    "action"			: function (obj) { this.paste(obj); }
                                }
                            }
                        }
                    }
                  
            },
            // Using types - most of the time this is an overkill
            // read the docs carefully to decide whether you need types
        
          
            // UI & core - the nodes to initially select and open will be overwritten by the cookie plugin

            // the UI plugin - it handles selecting/deselecting/hovering nodes
            "ui" : {
                // this makes the node with ID node_4 selected onload
                "initially_select" : [ "item_4" ]
            },
            // the core plugin - not many options here
            "core" : {
                // just open those two nodes up
                // as this is an AJAX enabled tree, both will be downloaded from the server
                "initially_open" : [ "item_2" , "item_3" ]
            }
        })
        .bind("create.jstree", function (e, data) {
            
            $.post(
                "index.php", 
                {
                    "operation" : "create_node",
                    "id" : data.rslt.parent.attr("id").replace("item_",""),
                    "position" : data.rslt.position,
                    "title" : data.rslt.name,
                    "type" : data.rslt.obj.attr("rel")
                },
                function (r) {
                    //checking out wether function is called
                    alert('fired cerateFile');
                    if(r.status) {
                        $(data.rslt.obj).attr("id", "item_" + r.id);
                        
                    }
                    else {
                        $.jstree.rollback(data.rlbk);
                    }
                }
            );
        })
        .bind("remove.jstree", function (e, data) {
           
            data.rslt.obj.each(function () {
                $.ajax({
                    async : false,
                    type: 'GET',
                    url: "index.php",
                    data : {
                        "r" :  DCFilebrowser_controller+"/DCDeleteFile",
                        "pathToFile" : this.id.replace("item_","")
                    },
                    success : function (r) {
                        //checking out wether function is called
                        console.debug(data);
                        if(!r.status) {
                            data.inst.refresh();
                        }  
                    }
                });
            });
        })
        
        .bind("rename.jstree", function (e, data) {
            //checking out wether function is called
            alert('fired renameFile');
            $.post(
                "tree/update",
                {
                    "operation" : "rename_node",
                    "id" : data.rslt.obj.attr("id").replace("item_",""),
                    "title" : data.rslt.new_name
                },
                function (r) {
                    if(!r.status) {
                        $.jstree.rollback(data.rlbk);
                    }
                }
            );
        })
        .bind("select_node.jstree", function (e) {
            /**
             * This is copied over from a differnet project - wont work ! - uses tinyMCE wich 
             * will be made available but is not going to be integrated like this, to avoid dependencies. 
             */
            myPath = $.jstree._focused().get_selected().attr('path');
            mytype = $.jstree._focused().get_selected().attr('rel');
            if(mytype=="file"){
                $.ajax({
                    url: "index.php",
                    data: {
                        r: 'service/editHoroscope',
                        horoscopePath: myPath
                    },
                    type: "GET",
                    dataType : "html",
                    success: function( data ) {

                        $('#showresults').html(data);
    
                        tinymce.init({selector:'textarea' ,
                            height : '400px',
                            theme : 'modern',
                            menubar: false
                        
                        });
                        
                        $('form#horoscope-form').on('submit',function(e){
                            var $action =  $('form#horoscope-form').attr('action');
                            e.preventDefault();
                            $.ajax({
                                url: $action,  
                                type: "POST",
                                data :{
                                    HoroscopeForm : {
                                        body : $('#HoroscopeForm_body').val(),
                                        androidApp : $('#HoroscopeForm_androidApp').val(),
                                        date : $('#HoroscopeForm_date').val(),
                                        lang: $('#HoroscopeForm_lang').val(),
                                        expdate : $('#HoroscopeForm_expdate').val(),
                                        sign : $('#HoroscopeForm_sign').val()
                                    } 
                                },
                                success: function( data ) {
                                    var $result = $(data);
                                }
                            });
                        });
                    },
                    error: function( xhr, status ) {
                        alert( "Sorry, there was a problem!" );
                    },
                    complete: function( xhr, status ) {
                        
                        //$('#showresults').slideDown('slow')
                    }
                });
            }
        })

});
