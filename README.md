## DCFilemanager for Yii (alpha)
### generates a filebrowser using jsTree.

### This is alpha state 0.2a

It is currently under heavy development and we may introduce significant changes without prior notices.
 
Up to now, we can display a nice file-tree with jsTree. 
The contextmenu shouldnt be doin nothing, yet. 
Beta release will be a basic filebrowser with rename-, move- delete- and create- function.

### Usage (for testing/development)

An example usage would be:
```php
Yii::import('ext.dcfilemanager.DCFilemanager');

$this->widget('DCFilemanager', array(
 'rootDir' => '../your/path',
 'headline' => 'Super Filebrowser Test',
 'containerId' => 'myTree',
 'theme' => 'default',
 'controller' => 'yourControllerName'
));
```

And in your controller import the actions like this
```php
public function actions(){
 return array(
     'DCGetFileList'=>'application.extensions.dcfilemanager.actions.DCGetFileList',
     'DCCreateFile'=>'application.extensions.dcfilemanager.actions.DCCreateFile',
     'DCRenameFile'=>'application.extensions.dcfilemanager.actions.DCRenameFile',
     'DCDeleteFile'=>'application.extensions.dcfilemanager.actions.DCDeleteFile'
 );
}
```
