<?php
$history_file = "history.txt";

if (file_exists($history_file)) {
    $lines = file($history_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    echo json_encode($lines);
} else {
    echo json_encode([]);
}
?>
