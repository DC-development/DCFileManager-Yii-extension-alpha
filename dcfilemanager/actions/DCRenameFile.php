<?php

/**
 * Renames a file by given path
 */
class DCRenameFile extends CAction {

    public function run($id, $newname) {
        $result = "fired renameFile for $id to $newname";
        print $result;
 
    }
}