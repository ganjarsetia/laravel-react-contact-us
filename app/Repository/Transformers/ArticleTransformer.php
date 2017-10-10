<?php
/**
 * Created by PhpStorm.
 * User: d.adelekan
 * Date: 24/08/2016
 * Time: 01:57
 */

namespace App\Repository\Transformers;


class ArticleTransformer extends Transformer{

    public function transform($article){

        return [
            'id' => $article->id,
            'title' => $article->title,
            'slug' => $article->slug,
            'excerpts' => $article->excerpts,
            'body' => $article->body,
            'user' => [
                'id' => $article->user->id,
                'fullname' => $article->user->name,
                'email' => $article->user->email,
            ]
        ];

    }

}