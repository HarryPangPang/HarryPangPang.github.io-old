<template>
    <div class="qrwarp">
       <script src="https://cdn.jsdelivr.net/npm/davidshimjs-qrcodejs@0.0.2/qrcode.min.js"></script>
        <div>
            <input v-model="message" placeholder="请输入内容"/>
            <button @click="generateQR">确定</button>
            <button @click="clearQR">清除</button>
        </div>
        <div id="qrcode"></div>
    </div>
</template>
  
<script>
export default {
    data(){
        return{
            message:''
        }
    },
    methods:{
        generateQR(){
            this.clearQR()
            new QRCode(document.getElementById("qrcode"), {
                text: this.message,
                width: 360,
                height: 360,
                colorDark : "#000",
                colorLight : "#fff",
                correctLevel : QRCode.CorrectLevel.H
            });
        },
        clearQR(){
            let qrnode = document.getElementById("qrcode")
            qrnode.innerHTML=''
        }
    }
}
</script>

<style scoped>
.qrwarp{
    color: #333;
}
</style>