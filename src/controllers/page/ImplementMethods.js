export function goToIndex() {
    this.router.push({
        name: this.route_index,
        replace: true,
    });
}

export function addItem() {
    this.router.push({
        name: this.route_create,
    });
}

export function editItem(item) {
    this.router.push({
        name: this.route_edit,
        params: { id: item.id },
    });
}

export function showItem(item) {
    this.router.push({
        name: this.route_show,
        params: { id: item.id },
    });
}
