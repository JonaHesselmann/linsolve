<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->

<script>
export default{
    name: 'PrivacyPolicy'
}
</script>
<template>

        <div class="privacy-policy">
    <h1>{{ $t('privacyPolicy') }}</h1>
    <br>

    <section class="nonCenterText">
      <h2>{{ $t('privacyNote') }}</h2>
      <p>{{ $t('privacyNotetext') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h2>{{ $t('dataAcquisition') }}</h2>
      <h3>{{ $t('responsibilityDataCollection') }}</h3>
      <p>{{ $t('responsibilityText') }}</p>
      <h3>{{ $t('dataCollection') }}</h3>
      <p>{{ $t('dataColleczionTetxt') }}</p>
      <h3>{{ $t('benefitData') }}</h3>
      <p>{{ $t('benefitDataText') }}</p>
      <h3>{{ $t('rightsData') }}</h3>
      <p>{{ $t('rightsDataText') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h2>{{ $t('hosting') }}</h2>
      <p>{{ $t('hostingText') }}</p>
      <h3>{{ $t('externHosting') }}</h3>
      <p>{{ $t('externHostingText') }}</p>
      <p>{{ $t('externHostingTextDSVGO') }}</p>
      <h3>{{ $t('hoster') }}</h3>
      <p><strong>{{ $t('hosterName') }}</strong></p>
      <p>{{ $t('hosterAddress') }}</p>
      <p>{{ $t('hosterstreet') }} </p>
      <p>{{ $t('hosterCity') }}</p>
      <p>{{ $t('hosterNumber') }}</p>
      <p>{{ $t('hosterEmail') }}</p>
    </section>
    <br>

    <section class="nonCenterText"> 
      <h2>{{ $t('privacyNotes') }}</h2>
      <p>{{ $t('privacyNotesText') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h3>{{ $t('privacyPosition') }}</h3>
      <p>{{ $t('privacyPositionText') }}</p>
      <section class="imprint">
        <br>
            <h2 class="secondTitle"> {{ $t('imprintTitle') }} </h2>
            <p class="maintext">{{ $t('imprintName') }}</p>
            <p class="maintext">{{ $t('imprintStudent') }}</p>
            <p class="maintext">{{ $t('imprintHS') }}</p> 
            <p class="maintext">{{ $t('imprintContact') }}</p>
         <br>              
        </section>
        <section class="imprintHs">
            <h2 class="secondTitle">{{ $t('imprintAddressTitle') }}</h2>
            <p class="maintext">{{ $t('imprintHS') }}</p>
            <p class="maintext">{{ $t('imprintStreet') }}</p>
            <p class="maintext">{{ $t('imprintCity') }}</p>
           
        </section>
     
    </section>
    <br>

    <section class="nonCenterText">
      <h3>{{ $t('storageDuration') }}</h3>
      <p>{{ $t('storageDurationText') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h3>{{ $t('generalNote') }}</h3>
      <p>{{ $t('generalNoteText') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h2>{{ $t('receiver') }}</h2>
      <p>{{ $t('receiverText') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h2>{{ $t('recall') }}</h2>
      <p>{{ $t('recallText') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h2>{{ $t('contradiction') }}</h2>
      <p>{{ $t('contradictionText') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h2>{{ $t('complains') }}</h2>
      <p>{{ $t('complainsText') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h2>{{ $t('dataTransmission') }}</h2>
      <p>{{ $t('dataTransmissionText') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h2>{{ $t('information') }}</h2>
      <p>{{ $t('informationText') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h2>{{ $t('dataCollections') }}</h2>
      <p>{{ $t('dataCollectionsText') }}</p>
    </section>
    <br>

    <section class="nonCenterText">
      <h2>{{ $t('enquiry') }}</h2>
      <p>{{ $t('enquiryText') }}</p>
    </section>
    </div>
</template>
<style scoped>
.mainTitle{
  font-size: large;
}
.mainText{
  font-size: medium;
  color: #333;
}
.nonCenterText{
    text-align: justify;
}
</style>

