<?php

/**
 * Creates a file in a the given dir with given name
 */
class DCCreateFile extends CAction {

    public function run($pathToDir, $filename) {
        $result = "fired createFile $pathToDir/$filename";
        return $result;
    }
}