<?php
$history_file = "history.txt";

if (isset($_POST['calculation'])) {
    $calculation = $_POST['calculation'];

    if ($calculation === "clear") {
        file_put_contents($history_file, "");
        echo "cleared";
        exit;
    }

    file_put_contents($history_file, $calculation . "\n", FILE_APPEND);
    echo "saved";
} else {
    echo "no data";
}
?>
