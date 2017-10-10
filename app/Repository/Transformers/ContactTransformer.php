<?php

namespace App\Repository\Transformers;


class ContactTransformer extends Transformer{

    public function transform($contact){

        return [
            //'user_id' => $contact->id,
            'fullname' => $contact->name,
            'email' => $contact->email,
            'message' => $contact->message
        ];

    }

}
