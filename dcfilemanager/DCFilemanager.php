<?php

/**
 * DCFilemanager generates a Filebrowser using jsTree.
 *
 *
 * An example usage would be:
 * 
 * Yii::import('ext.dcfilemanager.DCFilemanager');
 * 
 * $this->widget('DCFilemanager', array(
 *  'rootDir' => '../generatedFiles',
 *  'headline' => 'Super Filebrowser Test',
 *  'containerId' => 'myTree',
 *  'theme' => 'default',
 *  'controller' => 'yourControllerName'
 * ));
 *
 * And in your controller import the actions like this
 * 
 * public function actions(){
 *  return array(
 *      'DCGetFileList'=>'application.extensions.dcfilemanager.DCGetFileList',
 *  );
 * }
 * 
 * @author Philipp Sengelmann <p.sengelmann@bitforce-it.de>
 * @version 0.1a
 * @link http://dc-development.de
 * @copyright Copyright &copy; 2013 Philipp Sengelmann
 * @license http://www.opensource.org/licenses/mit-license.php
 */
class DCFilemanager extends CWidget {

    public $rootDir;
    public $headline;
    public $containerId;
    public $theme;
    public $controller;

	/**
	 * Executes the widget.
	 * This method registers all needed client scripts and renders
	 * the config script block and the container.
	 */
	public function run() 
    {
        $m_output = CHtml::openTag('h2');
        $m_output .= $this->headline;
        $m_output .= CHtml::closeTag('h2');
        
        $m_output .= CHtml::openTag('h3');
        $m_output .= $this->rootDir;
        $m_output .= CHtml::closeTag('h3');
        
        $m_output .= CHtml::openTag('script');
        $m_output .= "DCFilebrowser_rootDir = '$this->rootDir'; ";
        $m_output .= "DCFilebrowser_containerId = '$this->containerId'; ";
        $m_output .= "DCFilebrowser_theme = '$this->theme'; ";
        $m_output .= "DCFilebrowser_controller = '$this->controller'";
        
        $m_output .= CHtml::closeTag('script');

        $m_output .= CHtml::openTag('div', array('id'=>$this->containerId));

        $m_output .= CHtml::closeTag('div');

        $this->registerClientScript();

        echo $m_output;

    }


    /**
     * Registers the needed CSS and JavaScript.
     */
    public function registerClientScript()
    {
        $cs = Yii::app()->getClientScript();
        $cs->registerCoreScript('jquery');
        $asset_url = Yii::app()->assetManager->publish(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'jstree-v1', false, -1, true);
        $cs->registerScriptFile("$asset_url/jquery.jstree.js", CClientScript::POS_END);
        $cs->registerScriptFile("$asset_url/treeview.js", CClientScript::POS_END);
    }
    
  
  
}