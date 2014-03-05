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
        $fileListArray = array();
        
      //  echo "[";
        foreach( new DirectoryIterator($pathTofileListDirectory) as $file) {
            $i++;
            if($file->isFile() === FALSE && $file->getBasename()!='.'&& $file->getBasename()!='..') {
                array_push($fileListArray, array(
                    'attr' => array(
                        'id' => "folder_".$i, 
                        'path' => $pathTofileListDirectory."/".$file->getBasename()."/",
                        'rel' => "folder",
                        'page_id' => $i
                    ),
                    'data' => $file->getBasename()."",
                    'csscl' => "ui-state-error",
                    'state' => "closed"
                ));
            }
        }
        $i=0;
        foreach( new DirectoryIterator($pathTofileListDirectory) as $file) {
            $i++;
            if( $file->isFile() === TRUE ) {
                array_push($fileListArray, array(
                    'attr' => array(
                        'id' => "file_".$i."",
                        'path' => $pathTofileListDirectory."/".$file->getBasename()."/",
                        'rel' => "file",
                        'page_id' => $i
                    ),
                    'data' => $file->getBasename()."",
                    'csscl' => "ui-state-error",
                    'state' => "empty"
                ));
            }
        }
        
        echo json_encode($fileListArray);
    }
}