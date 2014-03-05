<?php

/**
 * Returns json Object containing the contents of current dir requested
 */
class DCGetFileList extends CAction {

    /**
     * @param $pathTofileListDirectory
     */
    public function run($pathTofileListDirectory) 
    {

        if(!is_dir($pathTofileListDirectory ))
        {
            die(" Invalid Directory");
        }

        if(!is_readable($pathTofileListDirectory ))
        {
            die("You don't have permission to read Directory");
        }

        $i=0;
        $fileListArray = array();
        
        foreach( new DirectoryIterator($pathTofileListDirectory) as $file) {
            $i++;
            if($file->isFile() === FALSE && $file->getBasename()!='.'&& $file->getBasename()!='..') {
                $fileListArray = $this->buildFileList($fileListArray, $pathTofileListDirectory, $file, $i, "folder", "closed");
                
            };
        }
        $i=0;
        foreach( new DirectoryIterator($pathTofileListDirectory) as $file) {
            $i++;
            if( $file->isFile() === TRUE ) {
                $fileListArray = $this->buildFileList($fileListArray, $pathTofileListDirectory, $file, $i, "file", "empty");
            };
        }
        
        echo json_encode($fileListArray);
    }

    /**
     * @param $fileListArray
     * @param $pathTofileListDirectory
     * @param $file
     * @param $i
     * @param $type
     * @param $state
     * @return mixed
     */
    private function buildFileList($fileListArray, $pathTofileListDirectory, $file, $i, $type, $state)
    {
        array_push($fileListArray, array(
            'attr' => array(
                'id' => "$type".$i."",
                'path' => $pathTofileListDirectory.$file->getBasename()."/",
                'rel' => "$type",
                'page_id' => $i,
                'parent' => $file->getPath()
            ),
            'data' => $file->getBasename(),
            'csscl' => "ui-state-error",
            'state' => $state
        ));
        return $fileListArray;
    }
}