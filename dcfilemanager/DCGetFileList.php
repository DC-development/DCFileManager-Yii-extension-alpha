<?php

/**
 * Returns horoscope files from genrated as json list
 */
class DCGetFileList extends CAction {

    public function run($pathTofileListDirectory) {
        $controller = $this->getController();

        $fileListOfDirectory = array ();
        $DirListOfDirectory = array ();
        
       // $pathTofileListDirectory = '../generatedFiles/DogsHoroscope/de/2038-01-01' ;

        if(!is_dir($pathTofileListDirectory ))
        {
            die(" Invalid Directory");
        }

        if(!is_readable($pathTofileListDirectory ))
        {
            die("You don't have permission to read Directory");
        }
        $i=0;
        /**
         * @Todo Bad way to build json vector
         */
        echo "[";
        foreach( new DirectoryIterator($pathTofileListDirectory) as $file) {
            $i++;
            if ( $file->getBasename () !== '.DS_Store') {
                if( $file->isFile() === TRUE && $file->getBasename() !=".htaccess" ) {
                    // array_push ( $fileListOfDirectory, $file->getBasename () );                
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
                    // array_push ( $DirListOfDirectory, $file->getBasename () );
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
         * @Todo Even worse way to terminate json vector
         */
        echo "{}";
        echo "]";
    }
    //$this->render('getHoroscopeJson',array('fileListOfDirectory'=>$fileListOfDirectory, 'dirPath'=>$pathTofileListDirectory, 'DirListOfDirectory'=>$DirListOfDirectory));
}