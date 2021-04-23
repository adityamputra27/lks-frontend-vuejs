<template>
    <div class="container">
        <div class="board-container">
            <div class="board-wrapper" v-for="board in boards" :key="board.id" @click="isEditBoard=board.id">
                <div class="board" @keyup.esc="isEditBoard=null">
                    <input v-model="board.name" type="text" v-if="isEditBoard==board.id" @keyup.enter="updateBoard(board.id)">
                    <span v-else>{{ board.name }}</span>
                    </div></div>

                <div class="board-wrapper" @keyup.esc="isAddBoard = false"><div class="board new-board" v-if="isAddBoard" >
                    <input type="text" placeholder="New Board Name" autofocus @keyup.enter="createBoard()" v-model="boardData.name">
                </div>
                <div @click="isAddBoard = !isAddBoard" class="board new-board" v-else>Create new board...</div>
            </div>
        </div>
    </div>
</template>

<script>

const baseURL = 'http://localhost:8000/v1/'
let token = localStorage.getItem('token')

export default {
    data() {
        return {
            boards: '',
            isAddBoard: false,
            isEditBoard: '',
            boardData : {
                name: ''
            }
        }
    },
    created() {
        // setInterval(this.loadBoard, 1000)
        this.loadBoard()
    },
    methods: {
        loadBoard() {
            window.axios.get(baseURL+'board?token='+token)
            .then(response => {
                // console.log(response)
                this.boards = response.data.board
            })
        },
        createBoard() {
            window.axios.post(baseURL+'board?token='+token, this.boardData)
            .then(response => {
                console.log(response)
                this.isAddBoard = false
                this.loadBoard()
            })
        },
        updateBoard() {
            window.axios.put(baseURL+'board/'+this.isEditBoard+'?token='+token, this.board)
            .then(response => {
                console.log(response)
                this.isEditBoard = null
                this.loadBoard()
            })
        }
    }
}
</script>