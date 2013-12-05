$(function () {
    //,"contextmenu"
    //,"dnd"
    $("#tree").jstree({
            // List of active plugins
            "plugins" : [
                "themes","json_data","ui","crrm","search","types"
            ],
        "themes" : {
            "theme" : "classic"
            
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
                            "r" : "service/getHoroscope",
                            "pathTofileListDirectory" : n.attr ? n.attr("path") : '../generatedFiles'
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
                        "myownentry" : {
                            "separator_before"	: true,
                            "icon"				: false,
                            "separator_after"	: false,
                            "label"				: "My own entry",
                            "action"			: false,
                            "submenu" : {
                                "cut" : {
                                    "separator_before"	: false,
                                    "separator_after"	: false,
                                    "label"				: "my submenu",
                                    "action"			: function (obj) { this.cut(obj); }
                                }
                            }
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
        
            "types" : {
                // I set both options to -2, as I do not need depth and children count checking
                // Those two checks may slow jstree a lot, so use only when needed
                "max_depth" : -2,
                "max_children" : -2,
                // I want only `drive` nodes to be root nodes 
                // This will prevent moving or creating any other type as a root node
                "valid_children" : [ "drive" ],
                "types" : {
                    // The default type
                    "default" : {
                        // I want this type to have no children (so only leaf nodes)
                        // In my case - those are files
                        "valid_children" : "none",
                        // If we specify an icon for the default type it WILL OVERRIDE the theme icons
                        "icon" : {
                            "image" : "images/file.png"
                        }
                    },
                    // The `folder` type
                    "folder" : {
                        // can have files and other folders inside of it, but NOT `drive` nodes
                        "valid_children" : [ "default", "folder" ],
                        "icon" : {
                            "image" : "images/folder.png"
                        }
                    },
                    // The `drive` nodes 
                    "drive" : {
                        // can have files and folders inside, but NOT other `drive` nodes
                        "valid_children" : [ "default", "folder" ],
                        "icon" : {
                            "image" : "http://ubuntuserver/symfony-test/root.png"
                        },
                        // those prevent the functions with the same name to be used on `drive` nodes
                        // internally the `before` event is used
                        "start_drag" : false,
                        "move_node" : false,
                        "delete_node" : false,
                        "remove" : false
                    }
                }
            },
            // UI & core - the nodes to initially select and open will be overwritten by the cookie plugin

            // the UI plugin - it handles selecting/deselecting/hovering nodes
            "ui" : {
                // this makes the node with ID node_4 selected onload
                "initially_select" : [ "node_4" ]
            },
            // the core plugin - not many options here
            "core" : {
                // just open those two nodes up
                // as this is an AJAX enabled tree, both will be downloaded from the server
                "initially_open" : [ "node_2" , "node_3" ]
            }
        })
        .bind("create.jstree", function (e, data) {
            $.post(
                "tree/create", 
                {
                    "operation" : "create_node",
                    "id" : data.rslt.parent.attr("id").replace("node_",""),
                    "position" : data.rslt.position,
                    "title" : data.rslt.name,
                    "type" : data.rslt.obj.attr("rel")
                },
                function (r) {
                    if(r.status) {
                        $(data.rslt.obj).attr("id", "node_" + r.id);
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
                    type: 'POST',
                    url: "./server.php",
                    data : {
                        "operation" : "remove_node",
                        "id" : this.id.replace("node_","")
                    },
                    success : function (r) {
                        if(!r.status) {
                            data.inst.refresh();
                        }
                    }
                });
            });
        })
        .bind("rename.jstree", function (e, data) {
            $.post(
                "tree/update",
                {
                    "operation" : "rename_node",
                    "id" : data.rslt.obj.attr("id").replace("node_",""),
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
            //alert($.jstree._focused().get_selected().attr('path'));
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
                        var $result = $(data).find('form');
                       
                        $('#showresults').replaceWith($('#showresults').html($result));
    
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
                                    //alert ('saved!');
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
/**
$(function () {
 
    $.jstree._themes = "http://ubuntuserver/symfony-test/web/bundles/dcfrontend/jstree-v1/themes/";

    $("#tree").jstree({
        "plugins" : [
            "themes","json_data","ui","crrm","dnd","search","types","contextmenu"
        ],
        "themes" : {
            "theme" : "default",
            "dots" : false,
            "icons" : false
        },
        "json_data" : {
            "ajax" : {
                "url" : "http://ubuntuserver/symfony-test/web/app_dev.php/member/parent",
                "data" : function (n) {
                    return {
                        "operation" : "get_children",
                        "id" : n.attr ? n.attr("id").replace("node_","") : 2
                    };
                }
            }
        },
        // the UI plugin
        "ui" : {
            // selected onload
            "initially_select" : [ "node_14" ]
        },
        // the core plugin
        "core" : {
            "initially_open" : [ "node_14" ],
            "animation" : 1
            }
    });
});
    **/