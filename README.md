## DCFilemanager for Yii (alpha)
### generates a filebrowser using jsTree.

### This is alpha state 0.1a

Up to now, we can display a nice file-tree with jsTree. 
The contextmenu shouldnt be doin nothing, yet. 
Beta release will be a basic filebrowser with rename-, move- delete- and create- function.

### Usage (for testing/development)

An example usage would be:
```
Yii::import('ext.dcfilemanager.DCFilemanager');

$this->widget('DCFilemanager', array(
 'rootDir' => '../generatedFiles',
 'headline' => 'Super Filebrowser Test',
 'containerId' => 'myTree',
 'theme' => 'default',
 'controller' => 'yourControllerName'
));
```

And in your controller import the actions like this

```
public function actions(){
 return array(
     'DCGetFileList'=>'application.extensions.dcfilemanager.DCGetFileList',
 );
}
```