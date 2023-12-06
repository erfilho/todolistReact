import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/fireBaseConnection";
import { Table, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function AllTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "tarefas"));
      setTarefas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const success = () => {
    messageApi.open({
      type: "success",
      content: `Tarefa excluída com sucesso!`,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Erro ao excluir tarefa!",
    });
  };

  const showPromiseConfirm = (id) => {
    Modal.confirm({
      title: "Tem certeza?",
      icon: <ExclamationCircleOutlined />,
      content: "Você tem certeza que quer deletar este item?",
      okButtonProps: { danger: true },
      onOk() {
        const handleDelete = async () => {
          try {
            console.log(id);
            await deleteDoc(doc(db, "tarefas", id));
            const data = await getDocs(collection(db, "tarefas"));
            setTarefas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            success();
          } catch (err) {
            error();
            console.log(err);
          }
        };
        handleDelete();
      },
      onCancel() {},
    });
  };

  const tableColumns = [
    {
      title: "Tarefa",
      dataIndex: "nome",
      key: "tarefa",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Operação",
      dataIndex: "code",
      key: "operacao",
      render: (_, record) => (
        <span className="flex gap-3 items-center justify-center">
          <a
            className="bg-rose-700 p-2 rounded hover:bg-rose-500 hover:text-black font-medium  "
            onClick={() => showPromiseConfirm(record.id)}
          >
            Apagar
          </a>
          <a
            className="bg-emerald-600 p-2 rounded hover:bg-emerald-300 hover:text-black font-medium"
            href={`/tarefas/edit/${record.id}`}
          >
            Editar
          </a>
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {contextHolder}
      <h1 className=" text-2xl font-medium"> Tarefas cadastradas </h1>
      <Table
        locale={{ emptyText: "Você não tem tarefas registradas" }}
        style={{}}
        dataSource={tarefas}
        columns={tableColumns}
      />
    </div>
  );
}
