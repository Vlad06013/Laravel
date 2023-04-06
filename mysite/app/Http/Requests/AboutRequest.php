<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>'required|min:2|max:4'
        ];
    }

    // public function attributes()
    // {
    //     return [
    //         'name'=>'Имя'
    //     ];
    // }

    public function messages()
    {
        return [
            'name.min'=>'Минимум 2 символа',
            'name.max'=>'Максимум 4 символа'
        ];
    }

}
