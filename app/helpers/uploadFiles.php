<?php
$uploaddir = '/img';
$uploadfile = $uploaddir . basename($_FILES['profilePhoto']['name']);

if (move_uploaded_file($_FILES['profilePhoto']['tmp_name'], $uploadfile)) {
    echo "Файл корректен и был успешно загружен.\n";
} else {
    echo "Возможная атака с помощью файловой загрузки!\n";
}
