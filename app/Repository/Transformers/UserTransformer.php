<?php

namespace App\Repository\Transformers;


class UserTransformer extends Transformer{

    public function transform($user){

        return [
            'user_id' => $user->id,
            'fullname' => $user->name,
            'email' => $user->email,
            'phone_number' => $user->telephone_number,
            'contact_address' => $user->address,
        ];

    }

}
