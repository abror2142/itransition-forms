<?php 

namespace App\Service;

use App\Entity\Form;
use Doctrine\Common\Collections\Collection;

class Analytics {
    public $excludeWords = [
        "a", "the", "it", "to", "he", "she", "it", "i", "we", "they", "you", 
        "at", "in", "on", "yes", "no", "by", ""
    ];
    
    public function getAnalytics (Form $form) {
        $questions= $form->getQuestions();
        $analytics = [];
        foreach ($questions as $question) {
            $answers = $question->getAnswers();
            $questionType = $question->getQuestionType()->getName();
            $questionId = $question->getId();
            $analytics[$questionId] = $this->analyseByType($questionType, $answers);
        }
        return $analytics;
    }

    private function analyseByType (string $questionType, Collection $answers) {
        $result = null;
        switch ($questionType) {
            case 'Multiple Choice':
                $result =  $this->analyseMultipleChoiceResponse($answers);
                break;
            case 'Checkbox':
                $result = $this->analyseCheckboxResponse($answers);
                break;
            case 'Integer':
                $result = $this->analyseIntegerResponse($answers);
                break;
            case 'Text':
                $result = $this->analyseTextResponse($answers);
                break;
            case 'Paragraph':
                $result = $this->analyseParagraphResponse($answers);
                break;
            default:
                break;
        }
        return $result;
    }

    private function analyseParagraphResponse (Collection $answers) {
        $wordArray = [];
        foreach ($answers as $answer) {
            $text = $answer->getAnswerParagraph();
            $words = $this->makeArray($text);
            $wordArray = array_merge($wordArray, $words);
        }
        $wordArray = $this->removeBasicWords($wordArray);
        $commonWord = $this->findMostCommonWord($wordArray);
        return $commonWord;
    }

    private function analyseTextResponse (Collection $answers) {
        $wordArray = [];
        foreach ($answers as $answer) {
            $text = $answer->getAnswerText();
            $words = $this->makeArray($text);
            $wordArray = array_merge($wordArray, $words);
        }
        $wordArray = $this->removeBasicWords($wordArray);
        $commonWord = $this->findMostCommonWord($wordArray);
        return $commonWord;
    }

    private function analyseMultipleChoiceResponse (Collection $answers) {
        $answerMap = [];
        $answerCount = 0;
        foreach ($answers as $answer) {
            $answerId = $answer->getAnswerMultipleChoice()->getId();
            if(array_key_exists($answerId, $answerMap))
                $answerMap[$answerId]++;
            else
                $answerMap[$answerId] = 1;
            $answerCount++;
        }
        $percentages = $this->calculatePercentage($answerMap, $answerCount);
        return $percentages;
    }

    public function calculatePercentage (array $responses, $totalCount) {
        # Gets key/value array => turns value to percentage
        $percentages = [];
        foreach ($responses as $key => $value) {
            $percentages[$key] = round($value/$totalCount * 100);
        }
        return $percentages;
    }

    public function analyseCheckboxResponse (Collection $answers) {
        $answerMap = [];
        $answerCount = 0;
        foreach ($answers as $answer) {
           $options = $answer->getOptions();
           foreach ($options as $option) {
                $optionId = $option->getId();
                if(array_key_exists($optionId, $answerMap))
                    $answerMap[$optionId]++;
                else
                    $answerMap[$optionId] = 1;
                $answerCount++;
           }
        }
        $percentages = $this->calculatePercentage($answerMap, $answerCount);
        return $percentages;
    }

    private function analyseIntegerResponse (Collection $answers) {
        $answerCount = 0;
        $sum = 0;
        foreach ($answers as $answer) {
            $sum += (int) $answer->getAnswerInteger();
            $answerCount++;
        }
        if($answerCount > 0)
            $avg = $sum/$answerCount;
        return $avg | 0;
    }

    public function cleanText (string $text) {
        // 1. Make is lowercase
        $cleanedText = strtolower($text);
        // 2. Remove unwanted chars
        $cleanedText = preg_replace("/[^a-zA-Z0-9]/s", ' ', $cleanedText);
        return $cleanedText;
    }

    public function makeArray($text){
        $text = $this->cleanText($text);
        $words = explode(' ', $text);
        return $words;
    }

    public function findMostCommonWord (array $words) {
        $counted = array_count_values($words); 
        arsort($counted); 
        return array_key_first($counted);
    }

    public function removeBasicWords (array $words) {
        $newWords = array_filter($words, fn($s) => !in_array($s, $this->excludeWords));
        return $newWords;
    }

}