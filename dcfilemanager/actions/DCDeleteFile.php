<?php

/**
 * Deletes a file by path
 */
class DCDeleteFile extends CAction {

    public function run($pathToFile) {
        $result = "fired deleteFile for $pathToFile";
        return $result;
    }
}