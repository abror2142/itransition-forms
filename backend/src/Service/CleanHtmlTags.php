<?php 

namespace App\Service;

class CleanHtmlTags {
    public function clean(array $data, string $field) {
        $cleanedData = array_map(fn($item) => array_merge($item, [$field => strip_tags($item[$field])]), $data);
        return $cleanedData;
    }
}