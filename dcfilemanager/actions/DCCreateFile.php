<?php

/**
 * Creates a file in a the given dir with given name
 */
class DCCreateFile extends CAction {
    
    /**
     * @param $pathToDir
     * @param $filename
     * @return string
     */
    public function run($pathToDir, $filename) {
        $result = "fired createFile ". $pathToDir.$filename;

        if(count(explode(".", $filename))>1){ // Differs files from dirs by naming (not good)
           $ourFileName = $pathToDir.$filename;
           $ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");
           fclose($ourFileHandle);
        }else{
            mkdir($pathToDir.$filename);
        }
       
        return $result;
    }
}