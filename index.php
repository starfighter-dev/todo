<?php

require 'vendor/autoload.php';

// To be fair, we're not really using smarty here.
use Smarty\Smarty;
$smarty = new Smarty();
$smarty->setTemplateDir('view');
$smarty->display('home.tpl');