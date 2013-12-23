<?php

/**
 * Renames a file by given path
 */
class DCDeleteFile extends CAction {

    public function run($pathToFile) {
        $result = "fired renameFile for $pathToFile";
        return $result;
    }
}