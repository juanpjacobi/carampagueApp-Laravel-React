<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;


class UserController extends Controller
{
    // Listar todos los usuarios
    public function index()
    {
        $users = User::all();
        return response()->json(['users' => UserResource::collection($users)], 200);
    }

    // Crear un nuevo usuario
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        // Asegurarse de encriptar la contraseña
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json(['user' => new UserResource($user)], 201);
    }

    // Actualizar el campo 'activo' de un usuario (o solo esa parte)
    public function updateActive(UpdateUserRequest $request, $id)
    {
        $data = $request->validated();
        $user = User::findOrFail($id);
        $user->update($data);

        return response()->json(['user' => new UserResource($user)], 200);
    }

    public function updateRole(Request $request, $id)
{
    $data = $request->validate([
        'rol_id' => 'required|exists:rols,id'
    ]);

    $user = User::findOrFail($id);
    $user->update($data);

    return response()->json(['user' => new UserResource($user)], 200);
}

    // (Opcional) Mostrar un usuario
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json(['user' => new UserResource($user)], 200);
    }

    // (Opcional) Eliminar un usuario (podrías implementar soft delete si necesitas histórico)
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente.'], 200);
    }
}
