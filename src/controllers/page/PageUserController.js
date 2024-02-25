import BasicInitialPage from "./BasicInitialPage";
import User from "@/apis/User";
import Modal from "@/controllers/state/ModalController";
import Loading from "@/controllers/state/LoadingController";
import { goToIndex, addItem, editItem, showItem } from "./ImplementMethods";

class PageUserController extends BasicInitialPage {
    route_index = "master-user";
    route_create = "master-user-create";
    route_edit = "master-user-edit";
    route_show = "master-user-show";

    constructor() {
        super();
        this.generate();
        this.generateForm();
    }

    generate() {
        this.table_headers = [
            { text: "Name", value: "name" },
            { text: "Email", value: "email" },
            { text: "Status", value: "is_active_desc" },
            { text: "Actions", value: "action" },
        ];
    }

    generateForm() {
        this.form = {
            name: "",
            email: "",
        };
    }

    async index() {
        try {
            this.state_table.loading = true;
            const { data, meta } = await User.getAll(this.table_params);
            this.state_table.items = data;
            this.state_table.total = meta.total;
        } catch (error) {
            throw new ErrorHandler(error);
        } finally {
            this.state_table.loading = false;
        }
    }

    deleteItem(item) {
        Modal.confirm(`Apakah anda yakin ingin menghapus data ${item.name}?`);
        Modal.onconfirm = () => {
            Loading.start();
            setTimeout(() => {
                Loading.stop();
                Modal.close();
            }, 2000);
            Modal.onclose = () => {
                this.index();
            };
        };
    }

    confirmSave() {
        Modal.confirm(`Apakah anda yakin ingin menyimpan data?`);
        Modal.onconfirm = () => this.store();
    }

    async store() {
        try {
            this.state_form.loading = true;
            const { message } = await User.createData(this.payload);
            Modal.onclose = () => this.goToIndex();
            Modal.success(message);
        } catch (error) {
            throw new ErrorHandler(error);
        } finally {
            this.state_form.loading = false;
        }
    }

    async show(id) {
        try {
            this.state_form.loading = true;
            const { data } = await User.getData(id);

            this.payload.id = data.id;
            this.payload.name = data.name;
            this.payload.email = data.email;
            this.payload.is_active = data.is_active;

            this.state_form.data.roles = data.roles;
            this.state_form.data.permissions = data.permissions;
        } catch (error) {
            throw new ErrorHandler(error);
        } finally {
            this.state_form.loading = false;
        }
    }

    confirmUpdate() {
        Modal.confirm(`Apakah anda yakin ingin mengubah data?`);
        Modal.onconfirm = () => this.update();
    }

    async update() {
        try {
            this.state_form.loading = true;
            const { message } = await User.updateData(this.payload.id, {
                name: this.payload.name,
                email: this.payload.email,
                is_active: this.payload.is_active,
            });
            Modal.success(message);
        } catch (error) {
            throw new ErrorHandler(error);
        } finally {
            this.state_form.loading = false;
        }
    }

    async sync(path = "path", key = "default", values = []) {
        try {
            const { message } = await User.syncData(path, {
                user_id: this.payload.id,
                [key]: values,
            });
            Modal.onclose = () => this.show(this.payload.id);
            Modal.success(message);
        } catch (error) {
            throw new ErrorHandler(error);
        }
    }
}

PageUserController.prototype.goToIndex = goToIndex;
PageUserController.prototype.addItem = addItem;
PageUserController.prototype.editItem = editItem;
PageUserController.prototype.showItem = showItem;

export default PageUserController;
