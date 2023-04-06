<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClickersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clickers', function (Blueprint $table) {
            $table->id();
            $table->string('url')->nullable();
            $table->string('posX')->nullable();
            $table->string('posY')->nullable();
            $table->date('date')->nullable();
            $table->string('hour')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clickers');
    }
}
