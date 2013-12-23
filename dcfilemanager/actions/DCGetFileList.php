<?php

/**
 * Returns json Object containing the contents of current dir requested
 */
class DCGetFileList extends CAction {

    public function run($pathTofileListDirectory) {
       
        if(!is_dir($pathTofileListDirectory ))
        {
            die(" Invalid Directory");
        }

        if(!is_readable($pathTofileListDirectory ))
        {
            die("You don't have permission to read Directory");
        }

        /**
         * @Todo Bad way to build json vector. Build a corresponding php-Object and then jsonEncode it.
         */
        $i=0;
        echo "[";
        foreach( new DirectoryIterator($pathTofileListDirectory) as $file) {
            $i++;
            if ( $file->getBasename () !== '.DS_Store') {
                if( $file->isFile() === TRUE && $file->getBasename() !=".htaccess" ) {
                                
                    echo "
                    {
                    \"attr\": { 
                        \"id\" : \"folder_".$i."\", 
                        \"path\" : \"".$pathTofileListDirectory."/".$file->getBasename()."\",
                        \"rel\" : \"file\",
                        \"page_id\" : \"".$i."\"
                        }, 
                    \"data\" : \"".$file->getBasename()."\",
                    \"csscl\":\"ui-state-error\",
                    \"state\":\"empty\"
                    },
                    ";
                }else{  
                    if($file->getBasename()!="."&&$file->getBasename()!=".." && $file->getBasename() !=".htaccess"){
                        echo "
                        {
                        \"attr\": { 
                            \"id\" : \"item_".$i."\", 
                            \"path\" : \"".$pathTofileListDirectory."/".$file->getBasename()."\",
                            \"rel\" : \"folder\",
                            \"page_id\" : \"".$i."\" 
                                }, 
                        \"data\" : \"".$file->getBasename()."\",
                        \"csscl\":\"ui-state-error\",
                        \"state\":\"closed\"
                        },
                        ";
                    }
                }
            }
        }
        /**
         * @Todo Even worse way to terminate json vector - Will be gone with solution above
         */
        echo "{}";
        echo "]";
    }
}