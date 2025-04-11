<template>
    <BRow class="justify-content-center align-items-end">
        <BCol cols="12" class="__chat position-relative">
            <div class="clear_button" @click="clearChat" />
            <div class="chat-boundaries position-absolute">
                <BRow class="position-relative">
                    <BCol cols="12" class="position-relative chat-content">
                        <div class="chat-header position-absolute w-100">
                            <div class="chat-header__avatar" />
                            <div class="chat-header__name">
                                <h5>Joanne</h5>
                                <p>Last seen 2 hours ago</p>
                            </div>
                        </div>
                        <div class="chat-text-input position-absolute w-100">
                            <BFormInput placeholder="Type a message" @keyup.enter.prevent="sendMessageRight"
                                v-model="text" />
                        </div>
                        <div class="chat-message-box" @wheel="scroll" ref="chatRef">
                            <TransitionGroup name="fade">
                                <div class="chat-message-box__message" v-for="(item, idx) in messages" :key="idx"
                                    :class="item.side">
                                    <p>{{ item.text }}</p>
                                </div>
                            </TransitionGroup>
                        </div>
                    </BCol>

                </BRow>
            </div>
        </BCol>
        <BCol cols="7" class="text-center">
            <p class="text-secondary text-center mt-4 mb-0">
                <small>press
                    <span class="text-warning pointer user-select-none"
                        @click="sendMessageRight(0, 'HELLO DUDE!')">ENTER</span> to send
                    messages.</small>
            </p>
            <p class="text-secondary">Incoming message</p>
            <BFormInput placeholder="Type a message" @keyup.enter.prevent="sendMessageLeft" v-model="textRight" />
        </BCol>
    </BRow>
</template>
<script lang="ts" setup>

const text = ref("");
const textRight = ref("");
const chatRef = ref<HTMLDivElement>();

const messages = ref<{ text: string, side: 'right' | 'left'; }[]>([
    { text: 'Hello 1', side: 'left' },
    { text: 'Hello 2', side: 'left' },
    { text: 'Hello 3', side: 'right' },
    { text: 'Hello 4', side: 'right' },
    { text: 'Hello 5', side: 'left' },
    { text: 'Hello 6', side: 'left' },
    { text: 'Hello 7', side: 'right' },
    { text: 'Hello 8', side: 'left' },
    { text: 'Hello 9', side: 'left' },
    { text: 'Hello 0', side: 'left' },
    { text: 'Hello 1', side: 'right' },
    { text: 'Hello 2', side: 'right' },
    { text: 'Hello 3', side: 'left' },
    { text: 'Hello 4', side: 'left' },
    { text: 'Hello 5', side: 'right' },
]);

const clearChat = () => {
    messages.value = [];
};

const sendMessageLeft = () => {
    messages.value.push({
        text: textRight.value,
        side: 'left',
    });
    textRight.value = '';
};

const sendMessageRight = (_: unknown, val?: string) => {
    messages.value.push({
        text: val || text.value,
        side: 'right',
    });
    text.value = '';
};

const scroll = (e: WheelEvent) => {
    chatRef.value?.scrollBy({
        top: 50 * e.deltaY / 100,
    });
};

</script>

<style scoped lang="scss">
.clear_button {
    position: absolute;
    top: 540px;
    cursor: pointer;
    border-radius: 50%;
    right: 50%;
    transform: translateX(50%);
    width: 40px;
    height: 40px;
    background-color: transparent;
    z-index: 100;
}

.__chat {
    width: 297px;
    height: 600px;
    background-color: black;
    background-image: url("~/assets/chat-bg.png");
    background-position: center;
    background-size: cover;
}

.chat-boundaries {
    width: 260px;
    height: 455px;
    border: 1px solid #000;
    background-image: url("~/assets/wp-bg.jpg");
    background-size: cover;
    overflow: hidden;
    top: 72px;
    left: 19px;
}

.chat-header {
    z-index: 2;
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 72px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(3px);
}

.chat-header__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    background-image: url("~/assets/avatar.png");
    background-position: 50% 0;
    background-size: 90%;
    background-repeat: no-repeat;
}

.chat-header__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.chat-header__name {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.chat-header__name h5 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.chat-header__name p {
    font-size: 12px;
    font-weight: 400;
    margin: 0;
    opacity: 0.7;
}

.chat-content {
    height: 455px;
}

.chat-text-input {
    bottom: 2px;
    left: 0;
    padding: 0 10px;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.1);
}

.chat-message-box {
    padding: 10px 30px;
    height: 100%;
    overflow-y: auto;
    position: absolute;
    width: 100%;
    height: fit-content;
    bottom: 40px;
}

.chat-message-box__message {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;

    &.left {
        justify-content: flex-start;
        margin-left: -20px;

        p {
            background-color: rgb(213, 255, 220);
        }

        ::before {
            content: ' ';
            position: absolute;
            border-top: 10px solid rgb(213, 255, 220);
            border-right: 10px solid rgb(213, 255, 220);
            border-left: 12px solid transparent;
            border-bottom: 12px solid transparent;
            background-color: transparent;
            left: 0px;
            top: 0px;
            z-index: -1;
        }
    }

    &.right {
        p {
            background-color: rgb(231, 213, 255);
        }

        ::before {
            content: ' ';
            position: absolute;
            border-left: 10px solid rgb(231, 213, 255);
            border-top: 10px solid rgb(231, 213, 255);
            border-bottom: 12px solid transparent;
            border-right: 12px solid transparent;
            background-color: transparent;
            right: 0px;
            top: 0px;
            z-index: -1;
        }
    }
}

.chat-message-box__message p {
    color: black;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 400;
    margin: 0;
    max-width: 200px;
}

.chat-message-box__message p:last-child {
    margin-right: 10px;
}

.chat-message-box__message p:first-child {
    margin-left: 10px;
}
</style>
