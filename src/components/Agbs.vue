<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->


<script>
export default {
  name: 'Agbs'
}
</script>

<template>
  <div>
    <header>
      <h1 class="mainTitle">{{ $t('gtcsHeadline') }}</h1>
    </header>

    <section class="section">
      <h2 class="secondTitle">1. {{ $t('scope') }} </h2>
      <p>
       {{ $t('scopeText') }}
      </p>
    </section>

    <section class="section">
      <h2 class="secondTitle">2. {{ $t('⁠useOfTheWebsite') }} </h2>
      <p>
       {{ $t('⁠useOfTheWebsiteText') }}
      </p>
    </section>

    <section class="section">
      <h2 class="secondTitle">3. {{ $t('⁠openSourceLicense') }} </h2>
      <p>
        {{ $t('openSourceLizenzText') }}
      </p>
    </section>

    <section class="section">
      <h2 class="secondTitle">4. {{ $t('disclaimer') }} </h2>
      <p>
        {{ $t('disclaimerText') }}
      </p>
    </section>

    <section class="section">
      <h2 class="secondTitle">5. {{ $t('changesAndAvailability') }} </h2>
      <p>
       {{ $t('changesAndAvailabilityText') }}
      </p>
    </section>

    <section class="section">
      <h2 class="secondTitle">6. {{ $t('⁠dataProtection') }} </h2>
      <p>
        {{ $t('dataProtectionText') }}
      </p>
    </section>

    <section class="section">
      <h2 class="secondTitle">7.{{ $t('⁠applicableLaw')}} </h2>
      <p>
        {{ $t('⁠applicablaLawText') }}
      </p>
    </section>
    
  </div>
</template>

<style>

.secondTitle{
  font-size: medium;
}

.mainTitle{
  font-size: large;
}

.action-container {
  text-align: center;
  margin-top: 5%;
}

.mainButton {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.mainButton:hover {
  background-color: #0056b3;
}
</style>


