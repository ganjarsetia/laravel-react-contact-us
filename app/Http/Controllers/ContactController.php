<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contact;
use App\Repository\Transformers\ContactTransformer;
use App\Http\Controllers\ApiController;
use \Illuminate\Http\Response as Res;
use Illuminate\Support\Facades\Input;
use Validator;

class ContactController extends ApiController
{
    protected $contactTransformer;

    public function __construct(ContactTransformer $contactTransformer){

        $this->contactTransformer = $contactTransformer;

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = array (

              'name' => 'required|max:255',
              'email' => 'required|email|max:255',
              'message' => 'required'

          );

          $errors = '';

          $validator = Validator::make($request->all(), $rules);

          if ($validator-> fails()){

            $messages = $validator->errors()->getMessages();
            foreach($messages as $message){
              foreach($message as $msg){
                $errors .= '<p>'.$msg.'</p>';
              }
            }

            return $this->respondValidationError('Fields Validation Failed.', $errors);

          } else {

              $contact = Contact::create([

                  'name' => $request['name'],
                  'email' => $request['email'],
                  'message' => $request['message']

              ]);

              return $this->respond([

                  'status' => 'success',
                  'status_code' => Res::HTTP_CREATED,
                  'message' => 'Message sent successfully',
                  'contact' => $this->contactTransformer->transform($contact)
              ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
