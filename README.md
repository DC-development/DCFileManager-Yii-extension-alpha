## DCFilemanager for Yii (alpha)
### generates a Filebrowser using jsTree.

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