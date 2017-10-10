<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Repository\Transformers\UserTransformer;
use App\Http\Controllers\ApiController;
use \Illuminate\Http\Response as Res;
use Illuminate\Support\Facades\Input;
use Validator;

class UserController extends ApiController
{

  protected $userTransformer;

  public function __construct(UserTransformer $userTransformer){

    $this->userTransformer = $userTransformer;

  }

  public function index(){
    $limit = Input::get('limit') ?: 20;

    $users = User::paginate($limit);

    return $this->respondWithPagination($users, [
      'users' => $this->userTransformer->transformCollection($users->all())
    ], 'Records Found!');
  }

  public function show($id){

    $user = User::find($id);

    return $this->respond([
        'status' => 'success',
        'status_code' => Res::HTTP_OK,
        'user' => $this->userTransformer->transform($user)
    ]);
  }

  public function store(Request $request)
  {
      $rules = array (

          'name' => 'required|max:255',
          'email' => 'required|email|max:255|unique:users',
          'password' => 'required|min:6|confirmed',
          'password_confirmation' => 'required|min:3',
          'phone_number' => 'required',
          'contact_address' => 'required'

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

      }

      else{

          $user = User::create([

              'name' => $request['name'],
              'email' => $request['email'],
              'password' => \Hash::make($request['password']),
              'telephone_number' => $request['phone_number'],
              'address' => $request['contact_address']

          ]);

          return $this->respond([

              'status' => 'success',
              'status_code' => Res::HTTP_CREATED,
              'message' => 'User created successfully',
              'user' => $this->userTransformer->transform($user)
          ]);
      }
  }

  public function update(Request $request)
  {
      $rules = array (

          'name' => 'required|max:255',
          'email' => 'required|email|max:255',
          'phone_number' => 'required',
          'contact_address' => 'required'

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

      }

      else{

        $user = User::find($request['user_id'])
          ->update([
            'name' => $request['name'],
            'email' => $request['email'],
            'telephone_number' => $request['phone_number'],
            'address' => $request['contact_address']
          ]);

          return $this->respond([

              'status' => 'success',
              'status_code' => Res::HTTP_OK,
              'message' => 'User updated successfully',
          ]);
      }
  }

  public function delete(Request $request){

    $id = $request['user_id'];

    $user = User::find($id)->delete();

    return $this->respond([
        'status' => 'success',
        'status_code' => Res::HTTP_OK,
        'message' => 'User deleted successfully',
    ]);

  }

}
