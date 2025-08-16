# OpenShift AI Implementation Guide: Technical Documentation for Implementation Teams

## Executive Summary

This technical guide provides implementation teams with comprehensive instructions for deploying and managing enterprise AI infrastructure using OpenShift container orchestration, Ollama inference engine, and Open WebUI interface. The solution delivers a centralized, secure, and scalable AI platform that eliminates the need for powerful local developer machines while providing production-grade AI capabilities.

## Technology Overview and Selection Rationale

### Why This Technology Stack?

Our enterprise AI infrastructure is built on three core principles:
1. **On-Premises Control** - Keep sensitive data and AI processing within corporate boundaries
2. **Cost Optimization** - Eliminate per-token charges while maximizing hardware utilization
3. **Developer Productivity** - Provide powerful AI tools through centralized, web-based interfaces

### Technology Architecture Decision Matrix

| Requirement | Technology Choice | Alternative Considered | Why We Chose This |
|------------|------------------|----------------------|------------------|
| **Container Platform** | OpenShift | Kubernetes, Docker Swarm | Enterprise features, GPU scheduling, security |
| **AI Inference Engine** | Ollama | LocalAI, vLLM, TGI | OpenAI API compatibility, ease of use, performance |
| **User Interface** | Open WebUI | LM Studio, Custom UI | Web-based, multi-user, ChatGPT-like experience |
| **Development Environment** | JupyterHub + VS Code Server | Local development | Centralized resources, consistent environments |
| **Model Context Protocol** | MCP Bridge | Native implementations | On-premises compatibility, extensibility |

## Core Technology Components

### OpenShift Container Platform

**What it is:** Red Hat's enterprise Kubernetes distribution with additional developer and operational features.

**Why we chose it:**
- **GPU Resource Management**: Intelligent scheduling and allocation of NVIDIA GPUs across workloads
- **Multi-Tenancy**: Secure isolation between teams and environments (dev/staging/production)
- **Enterprise Security**: Built-in RBAC, network policies, and security scanning
- **Developer Experience**: Integrated CI/CD, image registry, and deployment automation
- **Operational Excellence**: Advanced monitoring, logging, and troubleshooting capabilities

**Key Features for AI Workloads:**
```
┌─────────────────────────────────────────┐
│            OpenShift Platform           │
├─────────────────────────────────────────┤
│ • GPU Node Scheduling & Resource Quotas │
│ • Multi-Namespace Isolation            │
│ • Integrated Image Registry            │
│ • Service Mesh & Load Balancing        │
│ • Built-in Monitoring & Alerting       │
│ • Automated Scaling (HPA/VPA)          │
│ • Security Scanning & Policies         │
│ • GitOps Integration (ArgoCD)          │
└─────────────────────────────────────────┘
```

### Ollama Inference Engine

**What it is:** A lightweight, Docker-native tool for running large language models locally with OpenAI-compatible APIs.

**Why we chose it over alternatives:**

**vs LocalAI:**
- ✅ Better performance optimization for popular models
- ✅ Simpler model management (`ollama pull model-name`)
- ✅ More active community and faster development
- ✅ Better resource utilization and GPU scheduling

**vs vLLM/TGI:**
- ✅ Easier deployment and configuration for enterprise teams
- ✅ Built-in model quantization and optimization
- ✅ Better suited for diverse model requirements
- ✅ Lower operational complexity

**Core Capabilities:**
```
┌─────────────────────────────────────────┐
│              Ollama Engine              │
├─────────────────────────────────────────┤
│ • OpenAI API Compatibility (/v1/*)     │
│ • Automatic Model Quantization         │
│ • Multi-Model Concurrent Serving       │
│ • Built-in GPU Memory Management       │
│ • Model Version Control                │
│ • RESTful API with Streaming           │
│ • Docker-Native Architecture           │
│ • Zero-Config Model Loading            │
└─────────────────────────────────────────┘
```

**Supported Models:**
- **Code Generation**: CodeLlama (7B, 13B, 34B)
- **General Purpose**: Llama 3.2, Mistral, Qwen
- **Specialized**: Phi-3, Gemma, DeepSeek-Coder
- **Custom Models**: Any GGUF or Safetensors format

### Open WebUI Interface

**What it is:** A comprehensive web-based interface for interacting with local and remote AI models, designed to replicate the ChatGPT experience for enterprise use.

**Why we chose it over alternatives:**

**vs LM Studio:**
- ✅ Web-based (no desktop app required)
- ✅ Multi-user support with authentication
- ✅ Enterprise SSO integration
- ✅ Better suited for centralized deployment

**vs Custom Development:**
- ✅ Proven, battle-tested interface
- ✅ Active community and regular updates
- ✅ Built-in features (chat history, model switching, file upload)
- ✅ Faster time-to-market

**Enterprise Features:**
```
┌─────────────────────────────────────────┐
│             Open WebUI                  │
├─────────────────────────────────────────┤
│ • ChatGPT-like User Experience         │
│ • Multi-Model Support & Switching      │
│ • Enterprise SSO (OIDC/SAML)          │
│ • Role-Based Access Control           │
│ • Conversation History & Export       │
│ • File Upload & Processing            │
│ • Custom System Prompts               │
│ • Usage Analytics & Monitoring        │
│ • API Access for Integrations         │
│ • Mobile-Responsive Design            │
└─────────────────────────────────────────┘
```

### Centralized Development Environment

**What it provides:** Web-based development environments that eliminate the need for powerful local machines while providing access to shared GPU resources.

**Components:**
- **JupyterHub**: Multi-user Jupyter notebook server with GPU access
- **VS Code Server**: Browser-based VS Code with full IDE features
- **Shared Storage**: Common model repository and datasets
- **Personal Workspaces**: Individual developer environments with resource quotas

**Benefits of Centralization:**
```
Traditional Approach          →    Centralized Approach
┌─────────────────────┐       →    ┌─────────────────────────┐
│ Local Workstation   │       →    │   Web Browser Only      │
│ • Expensive GPU     │       →    │ • Any device, anywhere  │
│ • 64GB+ RAM         │       →    │ • Consistent environment│
│ • Model Downloads   │       →    │ • Shared resources      │
│ • Environment Setup │       →    │ • Zero setup time       │
│ • Isolated Work     │       →    │ • Easy collaboration    │
└─────────────────────┘       →    └─────────────────────────┘
```

### Model Context Protocol (MCP) Integration

**What it is:** Anthropic's open standard for connecting AI models to external data sources and tools, enabling AI assistants to interact with enterprise systems.

**Why it matters for enterprise:**
- **Data Integration**: Connect AI to databases, file systems, APIs
- **Tool Extensibility**: Add custom capabilities for specific business needs
- **Standardized Protocol**: Future-proof integration approach
- **Security**: Controlled access to sensitive enterprise data

**Our Implementation Approach:**
```
┌─────────────────────────────────────────┐
│          MCP Architecture               │
├─────────────────────────────────────────┤
│ Ollama ← MCP Bridge → MCP Servers      │
│                         ├─ Filesystem  │
│                         ├─ Database    │
│                         ├─ GitHub      │
│                         ├─ Custom APIs │
│                         └─ Enterprise  │
│                            Systems     │
└─────────────────────────────────────────┘
```

## Implementation Benefits

### For Developers
- **Zero Setup Time**: Access powerful AI tools through any web browser
- **Consistent Environment**: Same setup across all team members
- **Shared Resources**: Access to expensive GPU hardware without individual purchases
- **Collaboration**: Easy sharing of models, datasets, and experiments

### For Operations Teams
- **Centralized Management**: Single platform for all AI workloads
- **Resource Optimization**: Efficient utilization of expensive GPU hardware
- **Security**: Centralized access control and audit trails
- **Scalability**: Easy scaling based on demand

### For the Organization
- **Cost Control**: Predictable infrastructure costs vs. per-token pricing
- **Data Security**: All processing stays within corporate boundaries
- **Compliance**: Easier adherence to regulatory requirements
- **Innovation**: Lower barriers to AI experimentation and adoption

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    User Access Layer                           │
├─────────────────────────────────────────────────────────────────┤
│  Web Browser │ Mobile App │ API Clients │ IDE Extensions      │
├─────────────────────────────────────────────────────────────────┤
│                   Application Layer                             │
├─────────────────────────────────────────────────────────────────┤
│ Open WebUI │ JupyterHub │ VS Code Server │ Custom Applications │
├─────────────────────────────────────────────────────────────────┤
│                   Service Layer                                 │
├─────────────────────────────────────────────────────────────────┤
│  Ollama Services  │  MCP Bridge  │  Model Registry │ Analytics  │
├─────────────────────────────────────────────────────────────────┤
│                  OpenShift Platform                             │
├─────────────────────────────────────────────────────────────────┤
│   Container Orchestration │ GPU Scheduling │ Service Mesh      │
├─────────────────────────────────────────────────────────────────┤
│                Infrastructure Layer                             │
├─────────────────────────────────────────────────────────────────┤
│      NVIDIA GPU Cluster │ High-Speed Storage │ Enterprise      │
│                         │                    │ Network         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Table of Contents
1. [OpenShift Fundamentals for AI Workloads](#1-openshift-fundamentals-for-ai-workloads)
2. [Centralized Development Environment Setup](#2-centralized-development-environment-setup)
3. [Ollama Installation and Configuration](#3-ollama-installation-and-configuration)
4. [Web Interface Deployment (Open WebUI)](#4-web-interface-deployment-open-webui)
5. [Container Lifecycle Management](#5-container-lifecycle-management)
6. [Environment Management Strategy](#6-environment-management-strategy)
7. [GPU Resource Management](#7-gpu-resource-management)
8. [AI Service Architecture](#8-ai-service-architecture)
9. [Networking and Service Discovery](#9-networking-and-service-discovery)
10. [Storage and Persistent Data](#10-storage-and-persistent-data)
11. [Security and Access Control](#11-security-and-access-control)
12. [Monitoring and Observability](#12-monitoring-and-observability)
13. [CI/CD Pipeline Integration](#13-cicd-pipeline-integration)
14. [Troubleshooting and Operations](#14-troubleshooting-and-operations)

## 1. OpenShift Fundamentals for AI Workloads

### 1.1 Core OpenShift Concepts

**Projects (Namespaces)**
```bash
# Create AI-specific projects
oc new-project ai-development
oc new-project ai-staging  
oc new-project ai-production

# Set resource quotas for AI workloads
oc create quota ai-compute-quota \
  --hard=requests.nvidia.com/gpu=4,limits.nvidia.com/gpu=4,requests.memory=32Gi \
  -n ai-development
```

**Pods vs Deployments vs DeploymentConfigs**
```yaml
# AI Model Deployment Example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ollama-codellama
  namespace: ai-production
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ollama-codellama
  template:
    metadata:
      labels:
        app: ollama-codellama
        model: codellama-13b
        tier: inference
    spec:
      containers:
      - name: ollama
        image: ollama/ollama:latest
        resources:
          requests:
            nvidia.com/gpu: 1
            memory: 8Gi
            cpu: 2
          limits:
            nvidia.com/gpu: 1
            memory: 16Gi
            cpu: 4
        env:
        - name: OLLAMA_HOST
          value: "0.0.0.0:11434"
        - name: OLLAMA_MODELS
          value: "/models"
        ports:
        - containerPort: 11434
          name: api
        volumeMounts:
        - name: model-storage
          mountPath: /models
        - name: tmp-storage
          mountPath: /tmp
        readinessProbe:
          httpGet:
            path: /api/tags
            port: 11434
          initialDelaySeconds: 30
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /api/tags
            port: 11434
          initialDelaySeconds: 60
          periodSeconds: 30
      volumes:
      - name: model-storage
        persistentVolumeClaim:
          claimName: ollama-models-pvc
      - name: tmp-storage
        emptyDir:
          sizeLimit: 4Gi
      nodeSelector:
        node-role.kubernetes.io/gpu: "true"
      tolerations:
      - key: nvidia.com/gpu
        operator: Exists
        effect: NoSchedule
```

### 1.2 OpenShift-Specific Features for AI

**Routes vs Services vs Ingress**
```yaml
# Service for internal communication
apiVersion: v1
kind: Service
metadata:
  name: ollama-service
  namespace: ai-production
spec:
  selector:
    app: ollama-codellama
  ports:
  - name: api
    port: 11434
    targetPort: 11434
  type: ClusterIP

---
# Route for external access
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: ollama-external
  namespace: ai-production
spec:
  to:
    kind: Service
    name: ollama-service
  port:
    targetPort: api
  tls:
    termination: edge
    insecureEdgeTerminationPolicy: Redirect
  wildcardPolicy: None
```

**BuildConfigs for Custom AI Images**
```yaml
apiVersion: build.openshift.io/v1
kind: BuildConfig
metadata:
  name: custom-ollama-build
  namespace: ai-development
spec:
  source:
    type: Git
    git:
      uri: https://github.com/your-org/custom-ollama
      ref: main
    contextDir: /
  strategy:
    type: Docker
    dockerStrategy:
      dockerfilePath: Dockerfile
  output:
    to:
      kind: ImageStreamTag
      name: custom-ollama:latest
  triggers:
  - type: ConfigChange
  - type: GitHub
    github:
      secret: github-webhook-secret
```

## 2. Centralized Development Environment Setup

### 2.1 Multi-User Development Architecture

**Centralized Development Strategy**
The centralized development environment eliminates the need for powerful local machines by providing shared GPU resources through OpenShift. This approach ensures consistent environments, better resource utilization, and easier collaboration.

```
┌─────────────────────────────────────────────────────────┐
│                Developer Access Layer                   │
├─────────────────────────────────────────────────────────┤
│ Web Browser │ VS Code Remote │ Jupyter Hub │ SSH/Terminal│
├─────────────────────────────────────────────────────────┤
│              Development Namespace                      │
├─────────────────────────────────────────────────────────┤
│ Personal Pods │ Shared Services │ Model Repository     │
├─────────────────────────────────────────────────────────┤
│          Shared GPU Pool (OpenShift Nodes)             │
└─────────────────────────────────────────────────────────┘
```

**Development Namespace Template**
```yaml
apiVersion: template.openshift.io/v1
kind: Template
metadata:
  name: developer-workspace-template
  namespace: ai-development
parameters:
- name: DEVELOPER_NAME
  description: Developer username
  required: true
- name: GPU_QUOTA
  description: GPU quota for developer
  value: "1"
- name: MEMORY_QUOTA
  description: Memory quota
  value: "16Gi"
objects:
# Personal namespace for developer
- apiVersion: v1
  kind: Namespace
  metadata:
    name: dev-${DEVELOPER_NAME}
    labels:
      type: developer-workspace
      owner: ${DEVELOPER_NAME}

# Resource quota for developer
- apiVersion: v1
  kind: ResourceQuota
  metadata:
    name: ${DEVELOPER_NAME}-quota
    namespace: dev-${DEVELOPER_NAME}
  spec:
    hard:
      requests.nvidia.com/gpu: ${GPU_QUOTA}
      limits.nvidia.com/gpu: ${GPU_QUOTA}
      requests.memory: ${MEMORY_QUOTA}
      limits.memory: ${MEMORY_QUOTA}
      requests.cpu: "4"
      limits.cpu: "8"
      persistentvolumeclaims: "5"

# Personal development pod
- apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: ${DEVELOPER_NAME}-workspace
    namespace: dev-${DEVELOPER_NAME}
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: developer-workspace
        owner: ${DEVELOPER_NAME}
    template:
      metadata:
        labels:
          app: developer-workspace
          owner: ${DEVELOPER_NAME}
      spec:
        containers:
        - name: workspace
          image: your-registry.com/dev-workspace:latest
          resources:
            requests:
              nvidia.com/gpu: 1
              memory: 8Gi
              cpu: 2
            limits:
              nvidia.com/gpu: 1
              memory: 16Gi
              cpu: 4
          ports:
          - containerPort: 8080
            name: jupyter
          - containerPort: 8443
            name: vscode
          - containerPort: 22
            name: ssh
          env:
          - name: DEVELOPER_NAME
            value: ${DEVELOPER_NAME}
          - name: JUPYTER_ENABLE_LAB
            value: "yes"
          - name: GRANT_SUDO
            value: "yes"
          volumeMounts:
          - name: workspace-storage
            mountPath: /home/jovyan
          - name: shared-models
            mountPath: /models
            readOnly: true
          - name: shared-datasets
            mountPath: /datasets
            readOnly: true
        volumes:
        - name: workspace-storage
          persistentVolumeClaim:
            claimName: ${DEVELOPER_NAME}-workspace-pvc
        - name: shared-models
          persistentVolumeClaim:
            claimName: shared-models-pvc
        - name: shared-datasets
          persistentVolumeClaim:
            claimName: shared-datasets-pvc
```

### 2.2 Shared Development Services

**JupyterHub Multi-User Setup**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jupyterhub
  namespace: ai-development
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jupyterhub
  template:
    metadata:
      labels:
        app: jupyterhub
    spec:
      serviceAccountName: jupyterhub
      containers:
      - name: jupyterhub
        image: jupyterhub/k8s-hub:3.2.1
        resources:
          requests:
            memory: 1Gi
            cpu: 0.5
          limits:
            memory: 2Gi
            cpu: 1
        env:
        - name: CONFIGPROXY_AUTH_TOKEN
          valueFrom:
            secretKeyRef:
              name: jupyterhub-config
              key: proxy-token
        ports:
        - containerPort: 8000
        volumeMounts:
        - name: config
          mountPath: /etc/jupyterhub
        - name: shared-models
          mountPath: /shared/models
      volumes:
      - name: config
        configMap:
          name: jupyterhub-config
      - name: shared-models
        persistentVolumeClaim:
          claimName: shared-models-pvc
```

## 3. Ollama Installation and Configuration

### 3.1 Ollama Base Deployment

**Step-by-Step Ollama Setup**

**1. Create Ollama Namespace and Resources**
```bash
#!/bin/bash
# Ollama Setup Script for OpenShift

set -e

NAMESPACE="ai-production"
MODELS_STORAGE_SIZE="500Gi"
TEMP_STORAGE_SIZE="50Gi"

echo "=== Setting up Ollama on OpenShift ==="

# Create namespace
oc new-project $NAMESPACE || oc project $NAMESPACE

# Create storage for models
cat << EOF | oc apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ollama-models-pvc
  namespace: $NAMESPACE
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: $MODELS_STORAGE_SIZE
  storageClassName: ai-model-storage
EOF

echo "Storage created successfully"
```

**2. Ollama Deployment Configuration**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ollama-service
  namespace: ai-production
  labels:
    app: ollama
    component: inference-engine
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: ollama
  template:
    metadata:
      labels:
        app: ollama
        component: inference-engine
    spec:
      containers:
      - name: ollama
        image: ollama/ollama:latest
        resources:
          requests:
            nvidia.com/gpu: 1
            memory: 8Gi
            cpu: 2
          limits:
            nvidia.com/gpu: 1
            memory: 16Gi
            cpu: 4
        env:
        - name: OLLAMA_HOST
          value: "0.0.0.0:11434"
        - name: OLLAMA_ORIGINS
          value: "*"
        - name: OLLAMA_MODELS
          value: "/models"
        - name: OLLAMA_KEEP_ALIVE
          value: "24h"
        ports:
        - containerPort: 11434
          name: http
        volumeMounts:
        - name: models-storage
          mountPath: /models
        readinessProbe:
          httpGet:
            path: /api/tags
            port: 11434
          initialDelaySeconds: 10
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /api/tags
            port: 11434
          initialDelaySeconds: 60
          periodSeconds: 30
      volumes:
      - name: models-storage
        persistentVolumeClaim:
          claimName: ollama-models-pvc
      nodeSelector:
        node-role.kubernetes.io/gpu: "true"
```

### 3.2 Model Management

**Model Preloading Job**
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: ollama-model-init
  namespace: ai-production
spec:
  template:
    spec:
      restartPolicy: OnFailure
      containers:
      - name: model-loader
        image: ollama/ollama:latest
        command:
        - /bin/bash
        - -c
        - |
          ollama serve &
          sleep 15
          ollama pull codellama:7b
          ollama pull codellama:13b
          ollama pull mistral:7b
          ollama list
          pkill ollama
        volumeMounts:
        - name: model-storage
          mountPath: /root/.ollama
        resources:
          requests:
            nvidia.com/gpu: 1
            memory: 8Gi
          limits:
            nvidia.com/gpu: 1
            memory: 16Gi
      volumes:
      - name: model-storage
        persistentVolumeClaim:
          claimName: ollama-models-pvc
```

## 4. Web Interface Deployment (Open WebUI)

### 4.1 Open WebUI Installation

**Open WebUI Deployment**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: open-webui
  namespace: ai-production
  labels:
    app: open-webui
spec:
  replicas: 2
  selector:
    matchLabels:
      app: open-webui
  template:
    metadata:
      labels:
        app: open-webui
    spec:
      containers:
      - name: open-webui
        image: ghcr.io/open-webui/open-webui:main
        resources:
          requests:
            memory: 512Mi
            cpu: 0.5
          limits:
            memory: 2Gi
            cpu: 2
        env:
        - name: OLLAMA_BASE_URL
          value: "http://ollama-service:11434"
        - name: WEBUI_SECRET_KEY
          valueFrom:
            secretKeyRef:
              name: webui-secrets
              key: secret-key
        - name: WEBUI_AUTH
          value: "True"
        - name: WEBUI_NAME
          value: "Enterprise AI Assistant"
        - name: DEFAULT_MODELS
          value: "codellama:7b,codellama:13b,mistral:7b"
        ports:
        - containerPort: 8080
          name: http
        volumeMounts:
        - name: data-storage
          mountPath: /app/backend/data
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 30
      volumes:
      - name: data-storage
        persistentVolumeClaim:
          claimName: webui-data-pvc
```

**Service and Route Configuration**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: open-webui-service
  namespace: ai-production
spec:
  selector:
    app: open-webui
  ports:
  - port: 8080
    targetPort: 8080
    name: http

---
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: ai-chat
  namespace: ai-production
spec:
  host: ai-chat.apps.your-cluster.com
  to:
    kind: Service
    name: open-webui-service
  port:
    targetPort: http
  tls:
    termination: edge
    insecureEdgeTerminationPolicy: Redirect
```

## 5. GPU Resource Management

### 5.1 GPU Node Configuration

**Node Labels and Taints**
```bash
# Label GPU nodes
oc label node gpu-node-01 node-role.kubernetes.io/gpu=true
oc label node gpu-node-01 gpu.nvidia.com/class=A100

# Taint GPU nodes to ensure only GPU workloads are scheduled
oc adm taint node gpu-node-01 nvidia.com/gpu=true:NoSchedule
```

**GPU Resource Quotas**
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: ai-gpu-quota
  namespace: ai-production
spec:
  hard:
    requests.nvidia.com/gpu: "8"
    limits.nvidia.com/gpu: "8"
    requests.memory: "128Gi"
    limits.memory: "256Gi"
```

## 6. Monitoring and Observability

### 6.1 Prometheus Metrics Configuration

**ServiceMonitor for Ollama**
```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: ollama-metrics
  namespace: ai-production
spec:
  selector:
    matchLabels:
      app: ollama
  endpoints:
  - port: metrics
    interval: 30s
    path: /metrics
```

**AI Metrics Dashboard**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ai-dashboard-config
  namespace: ai-production
data:
  dashboard.json: |
    {
      "dashboard": {
        "title": "AI Infrastructure Overview",
        "panels": [
          {
            "title": "GPU Utilization",
            "type": "stat",
            "targets": [{"expr": "avg(DCGM_FI_DEV_GPU_UTIL) by (gpu)"}]
          },
          {
            "title": "Model Inference Rate", 
            "type": "graph",
            "targets": [{"expr": "rate(ollama_requests_total[5m])"}]
          }
        ]
      }
    }
```

## 7. Troubleshooting and Operations

### 7.1 Common Issues and Solutions

**GPU Troubleshooting Script**
```bash
#!/bin/bash
# GPU Troubleshooting Script

echo "=== GPU Node Status ==="
oc get nodes -l node-role.kubernetes.io/gpu=true -o wide

echo "=== GPU Resource Allocation ==="
oc describe nodes -l node-role.kubernetes.io/gpu=true | grep -A 10 "Allocated resources"

echo "=== GPU Pod Status ==="
oc get pods -A -o wide | grep nvidia.com/gpu

echo "=== Checking for GPU Scheduling Issues ==="
oc get events -A --field-selector reason=FailedScheduling | grep -i gpu
```

**Model Management Scripts**
```bash
#!/bin/bash
# Model Management Utility

NAMESPACE="ai-production"

function list_models() {
    echo "=== Available Models ==="
    oc exec -n $NAMESPACE deployment/ollama-service -- ollama list
}

function add_model() {
    local model_name=$1
    echo "Adding model: $model_name"
    oc exec -n $NAMESPACE deployment/ollama-service -- ollama pull $model_name
}

function test_model() {
    local model_name=${1:-"codellama:7b"}
    echo "Testing model: $model_name"
    oc exec -n $NAMESPACE deployment/ollama-service -- \
        curl -X POST http://localhost:11434/api/generate \
        -H "Content-Type: application/json" \
        -d "{\"model\":\"$model_name\",\"prompt\":\"Write a hello world function\",\"stream\":false}"
}

# Main command dispatcher
case "$1" in
    list) list_models ;;
    add) add_model "$2" ;;
    test) test_model "$2" ;;
    *) echo "Usage: $0 {list|add|test} [arguments]" ;;
esac
```

## 8. Security and Access Control

### 8.1 RBAC Configuration

**Service Accounts and Roles**
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ai-service-account
  namespace: ai-production

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ai-operator
  namespace: ai-production
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps", "secrets"]
  verbs: ["get", "list", "watch", "create", "update", "patch"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "watch", "create", "update", "patch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ai-operator-binding
  namespace: ai-production
subjects:
- kind: ServiceAccount
  name: ai-service-account
  namespace: ai-production
roleRef:
  kind: Role
  name: ai-operator
  apiGroup: rbac.authorization.k8s.io
```

### 8.2 Network Security

**Network Policies**
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ai-production-isolation
  namespace: ai-production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  # Allow traffic from ai-staging for promotion testing
  - from:
    - namespaceSelector:
        matchLabels:
          name: ai-staging
  # Allow internal communication
  - from:
    - namespaceSelector:
        matchLabels:
          name: ai-production
  egress:
  # Allow external model downloads (controlled)
  - to: []
    ports:
    - protocol: TCP
      port: 443
  # Allow internal communication
  - to:
    - namespaceSelector:
        matchLabels:
          name: ai-production
```

### 8.3 Pod Security Standards

**Security Context Configuration**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-ollama
spec:
  template:
    spec:
      serviceAccountName: ai-service-account
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        runAsGroup: 1001
        fsGroup: 1001
      containers:
      - name: ollama
        image: ollama/ollama:latest
        securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - ALL
          readOnlyRootFilesystem: true
          runAsNonRoot: true
        volumeMounts:
        - name: tmp-volume
          mountPath: /tmp
        - name: ollama-data
          mountPath: /home/ollama/.ollama
      volumes:
      - name: tmp-volume
        emptyDir: {}
      - name: ollama-data
        persistentVolumeClaim:
          claimName: ollama-data-pvc
```

## 9. Storage and Persistent Data

### 9.1 Storage Classes for AI Workloads

**High-Performance Storage Class**
```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ai-fast-ssd
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: kubernetes.io/csi-driver
parameters:
  type: ssd
  replication-type: none
  iops: "10000"
  throughput: "500Mi"
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer

---
# Storage class for model repositories
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ai-model-storage
provisioner: kubernetes.io/csi-driver
parameters:
  type: ssd
  replication-type: 3-way
  compression: "true"
reclaimPolicy: Retain
allowVolumeExpansion: true
```

### 9.2 Persistent Volume Management

**Shared Model Storage**
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shared-models-pvc
  namespace: ai-production
spec:
  accessModes:
  - ReadWriteMany  # Multiple pods can read the same models
  resources:
    requests:
      storage: 500Gi
  storageClassName: ai-model-storage

---
# Shared workspace for development
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shared-workspace-pvc
  namespace: ai-development
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 100Gi
  storageClassName: ai-fast-ssd
```

## 10. CI/CD Pipeline Integration

### 10.1 Tekton Pipeline for AI Models

**Model Build Pipeline**
```yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: ai-model-pipeline
  namespace: ai-development
spec:
  params:
  - name: model-name
    type: string
    description: Name of the AI model
  - name: model-version
    type: string
    description: Version of the model
  - name: git-url
    type: string
    description: Git repository URL
  
  workspaces:
  - name: shared-data
  
  tasks:
  - name: fetch-source
    taskRef:
      name: git-clone
    workspaces:
    - name: output
      workspace: shared-data
    params:
    - name: url
      value: $(params.git-url)
  
  - name: build-model-image
    taskRef:
      name: buildah
    runAfter:
    - fetch-source
    workspaces:
    - name: source
      workspace: shared-data
    params:
    - name: IMAGE
      value: your-registry.com/ai/$(params.model-name):$(params.model-version)
  
  - name: deploy-to-dev
    taskRef:
      name: openshift-client
    runAfter:
    - build-model-image
    params:
    - name: SCRIPT
      value: |
        oc process -f k8s/deployment-template.yaml \
          -p MODEL_NAME=$(params.model-name) \
          -p MODEL_VERSION=$(params.model-version) \
          -p ENVIRONMENT=development | oc apply -f -
```

### 10.2 GitOps with ArgoCD

**Application Definition**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ai-production-stack
  namespace: openshift-gitops
spec:
  project: ai-platform
  source:
    repoURL: https://github.com/your-org/ai-infrastructure
    targetRevision: main
    path: manifests/production
  destination:
    server: https://kubernetes.default.svc
    namespace: ai-production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
```

## 11. Auto-scaling and Performance Optimization

### 11.1 Horizontal Pod Autoscaler

**HPA Configuration for Ollama**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ollama-hpa
  namespace: ai-production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ollama-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 600
      policies:
      - type: Percent
        value: 25
        periodSeconds: 60
```

### 11.2 Vertical Pod Autoscaler

**VPA for Resource Optimization**
```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: ollama-vpa
  namespace: ai-production
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ollama-service
  updatePolicy:
    updateMode: "Auto"
  resourcePolicy:
    containerPolicies:
    - containerName: ollama
      maxAllowed:
        memory: 32Gi
        cpu: 8
      minAllowed:
        memory: 8Gi
        cpu: 2
      controlledResources: ["memory", "cpu"]
```

## 12. MCP (Model Context Protocol) Integration

### 12.1 MCP Bridge Deployment

**MCP Bridge Service**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mcp-bridge
  namespace: ai-production
spec:
  replicas: 2
  selector:
    matchLabels:
      app: mcp-bridge
  template:
    spec:
      containers:
      - name: mcp-bridge
        image: your-registry.com/mcp-bridge:latest
        resources:
          requests:
            memory: 512Mi
            cpu: 0.5
          limits:
            memory: 2Gi
            cpu: 2
        env:
        - name: OLLAMA_BASE_URL
          value: "http://ollama-service:11434"
        - name: MCP_CONFIG_PATH
          value: "/config/mcp-servers.json"
        ports:
        - containerPort: 8080
          name: http
        volumeMounts:
        - name: mcp-config
          mountPath: /config
        - name: workspace
          mountPath: /workspace
      volumes:
      - name: mcp-config
        configMap:
          name: mcp-server-config
      - name: workspace
        persistentVolumeClaim:
          claimName: shared-workspace-pvc
```

### 12.2 MCP Server Configuration

**Enterprise MCP Servers**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mcp-server-config
  namespace: ai-production
data:
  mcp-servers.json: |
    {
      "mcpServers": {
        "filesystem": {
          "command": "npx",
          "args": ["-y", "@modelcontextprotocol/server-filesystem", "/workspace"]
        },
        "postgres": {
          "command": "uvx",
          "args": ["mcp-server-postgres", "--connection-string", "${POSTGRES_CONNECTION}"]
        },
        "github": {
          "command": "npx",
          "args": ["-y", "@modelcontextprotocol/server-github"],
          "env": {
            "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
          }
        },
        "custom-enterprise": {
          "command": "python",
          "args": ["/opt/enterprise-mcp-server.py"]
        }
      }
    }
```

## 13. Backup and Disaster Recovery

### 13.1 Backup Strategy

**Automated Backup Scripts**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: backup-scripts
  namespace: ai-production
data:
  backup-models.sh: |
    #!/bin/bash
    set -e
    
    BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
    BACKUP_PATH="/backups/ai-models-$BACKUP_DATE"
    
    echo "Starting AI model backup to $BACKUP_PATH"
    
    # Backup model files
    oc exec -n ai-production deployment/ollama-service -- \
      tar czf - /models | \
      tar xzf - -C $BACKUP_PATH/models/
    
    # Backup configurations
    oc get configmaps -n ai-production -o yaml > $BACKUP_PATH/configmaps.yaml
    oc get secrets -n ai-production -o yaml > $BACKUP_PATH/secrets.yaml
    oc get pvc -n ai-production -o yaml > $BACKUP_PATH/pvcs.yaml
    
    echo "Backup completed: $BACKUP_PATH"
  
  restore-models.sh: |
    #!/bin/bash
    set -e
    
    BACKUP_PATH=$1
    if [ -z "$BACKUP_PATH" ]; then
        echo "Usage: $0 <backup-path>"
        exit 1
    fi
    
    echo "Restoring AI models from $BACKUP_PATH"
    
    # Scale down deployments
    oc scale deployment --all --replicas=0 -n ai-production
    
    # Restore configurations
    oc apply -f $BACKUP_PATH/configmaps.yaml
    oc apply -f $BACKUP_PATH/secrets.yaml
    oc apply -f $BACKUP_PATH/pvcs.yaml
    
    # Wait for PVCs to be bound
    oc wait --for=condition=Bound pvc --all -n ai-production --timeout=300s
    
    # Scale up deployments
    oc scale deployment --all --replicas=2 -n ai-production
    
    echo "Restore completed"
```

### 13.2 Disaster Recovery Procedures

**Incident Response Playbook**
```markdown
# AI Infrastructure Incident Response

## Severity Levels
- **P1**: Complete service outage
- **P2**: Significant performance degradation  
- **P3**: Minor issues, workarounds available

## P1 Response: Complete Outage

### Immediate Actions (0-15 minutes)
1. Check cluster status: `oc get nodes`
2. Check AI namespace status: `oc get pods -n ai-production`
3. Check GPU nodes: `oc get nodes -l node-role.kubernetes.io/gpu=true`
4. Review recent changes in GitOps

### Investigation (15-30 minutes)
1. Check pod events: `oc get events -n ai-production --sort-by='.lastTimestamp'`
2. Review logs: `oc logs -l app=ollama -n ai-production --tail=200`
3. Check resource availability: `oc describe nodes`
4. Verify external dependencies (storage, network)

### Recovery Actions
1. If GPU node issue: Drain and restart affected nodes
2. If pod issue: Delete and recreate problematic pods
3. If storage issue: Check PVC status and remount if needed
4. If network issue: Restart networking components

## Communication
- Update status page
- Notify stakeholders via Slack #ai-platform
- Create incident ticket
- Post-incident review within 24 hours
```

## 14. Performance Tuning and Optimization

### 14.1 Resource Optimization

**Performance Tuning Script**
```bash
#!/bin/bash
# AI Workload Performance Tuning

NAMESPACE="ai-production"

echo "=== Current Resource Usage ==="
oc top pods -n $NAMESPACE --sort-by=memory

echo "=== Horizontal Pod Autoscaler Status ==="
oc get hpa -n $NAMESPACE

echo "=== GPU Utilization ==="
oc exec -n gpu-operator-resources -l app=nvidia-dcgm-exporter -- nvidia-smi

echo "=== Performance Recommendations ==="
echo "1. Check GPU utilization - should be >70% for cost efficiency"
echo "2. Monitor memory usage - consider VPA recommendations"
echo "3. Review response times in monitoring dashboards"
echo "4. Check for GPU memory leaks with nvidia-smi"
```

### 14.2 Model Performance Optimization

**Model Configuration Tuning**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ollama-performance-config
  namespace: ai-production
data:
  performance-settings.env: |
    # Ollama Performance Settings
    OLLAMA_NUM_PARALLEL=4
    OLLAMA_MAX_LOADED_MODELS=3
    OLLAMA_MAX_QUEUE=512
    OLLAMA_KEEP_ALIVE=24h
    
    # GPU Memory Management
    OLLAMA_GPU_MEMORY_FRACTION=0.9
    OLLAMA_FLASH_ATTENTION=true
    
    # Model Loading Optimization
    OLLAMA_PRELOAD_MODELS=codellama:7b,mistral:7b
    OLLAMA_MODEL_CACHE_SIZE=8Gi
```

## 15. Maintenance and Operations

### 15.1 Scheduled Maintenance

**Maintenance Automation**
```bash
#!/bin/bash
# AI Infrastructure Maintenance Script

set -e

MAINTENANCE_DATE=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/ai-maintenance-$MAINTENANCE_DATE.log"

exec > >(tee -a $LOG_FILE)
exec 2>&1

echo "=== AI Infrastructure Maintenance Started at $(date) ==="

# Pre-maintenance backup
echo "1. Creating pre-maintenance backup..."
./backup-models.sh

# Scale down non-critical services
echo "2. Scaling down development environments..."
oc scale deployment --all --replicas=0 -n ai-development
oc scale deployment --all --replicas=0 -n ai-staging

# Update container images
echo "3. Updating container images..."
oc patch deployment ollama-service -n ai-production -p \
  '{"spec":{"template":{"spec":{"containers":[{"name":"ollama","image":"ollama/ollama:latest"}]}}}}'

# Wait for rollout
echo "4. Waiting for deployment rollout..."
oc rollout status deployment/ollama-service -n ai-production --timeout=600s

# Run health checks
echo "5. Running post-maintenance health checks..."
for svc in $(oc get svc -n ai-production -o name); do
    echo "Testing $svc..."
    oc exec -n ai-production deployment/ollama-service -- \
      curl -f http://${svc#service/}:11434/api/tags
done

# Scale back up
echo "6. Scaling back up non-production environments..."
oc scale deployment --all --replicas=1 -n ai-development
oc scale deployment --all --replicas=2 -n ai-staging

echo "=== AI Infrastructure Maintenance Completed at $(date) ==="
```

## Conclusion

## 16. Model Versioning and Lifecycle Management

### 16.1 Model Versioning Strategy

**Version Naming Convention**
```
Model Version Format: {model-name}:{size}-{version}-{variant}
Examples:
- codellama:7b-v1.0-base
- codellama:7b-v1.1-finetuned
- codellama:13b-v2.0-enterprise
- mistral:7b-v1.0-instruct
```

**Model Registry Architecture**
```
┌─────────────────────────────────────────────────────────┐
│                Model Registry                           │
├─────────────────────────────────────────────────────────┤
│ Git Repository    │ Container Registry │ Model Storage  │
│ • Model metadata  │ • Ollama images    │ • Model files  │
│ • Version tags    │ • Custom builds    │ • Checksums    │
│ • Release notes   │ • Security scans   │ • Artifacts    │
└─────────────────────────────────────────────────────────┘
```

### 16.2 Model Registry Implementation

**Model Registry Service**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: model-registry
  namespace: ai-infrastructure
spec:
  replicas: 2
  selector:
    matchLabels:
      app: model-registry
  template:
    spec:
      containers:
      - name: registry
        image: your-registry.com/model-registry:latest
        resources:
          requests:
            memory: 1Gi
            cpu: 0.5
          limits:
            memory: 4Gi
            cpu: 2
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: registry-secrets
              key: database-url
        - name: STORAGE_BACKEND
          value: "s3"
        - name: S3_BUCKET
          value: "enterprise-ai-models"
        - name: S3_ENDPOINT
          valueFrom:
            secretKeyRef:
              name: registry-secrets
              key: s3-endpoint
        ports:
        - containerPort: 8080
          name: http
        volumeMounts:
        - name: model-cache
          mountPath: /cache
        - name: config
          mountPath: /config
      volumes:
      - name: model-cache
        persistentVolumeClaim:
          claimName: model-cache-pvc
      - name: config
        configMap:
          name: registry-config

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: registry-config
  namespace: ai-infrastructure
data:
  registry-config.yaml: |
    server:
      port: 8080
      host: "0.0.0.0"
    
    storage:
      backend: "s3"
      cache_dir: "/cache"
      max_cache_size: "50Gi"
    
    models:
      supported_formats: ["gguf", "safetensors", "pytorch"]
      auto_quantization: true
      validation_enabled: true
      checksum_verification: true
    
    versioning:
      scheme: "semantic"  # v1.0.0, v1.1.0, etc.
      auto_increment: true
      retention_policy:
        keep_latest: 5
        keep_major_versions: true
        cleanup_after_days: 90
    
    security:
      scan_models: true
      require_signatures: true
      allowed_sources:
        - "huggingface.co"
        - "internal-builds"
    
    api:
      authentication: "oidc"
      rate_limiting:
        downloads: "10/minute"
        uploads: "5/minute"
```

### 16.3 Model Metadata Management

**Model Metadata Schema**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: model-metadata-schema
  namespace: ai-infrastructure
data:
  model-schema.json: |
    {
      "model_metadata": {
        "name": "codellama",
        "version": "7b-v1.0-base",
        "description": "CodeLlama 7B base model for code generation",
        "created_at": "2024-01-15T10:30:00Z",
        "created_by": "ai-platform-team",
        "size_gb": 4.2,
        "architecture": "llama2",
        "parameters": "7B",
        "quantization": "Q4_K_M",
        "source": {
          "origin": "meta/codellama-7b",
          "license": "custom",
          "checksum": "sha256:abc123..."
        },
        "performance": {
          "tokens_per_second": 45,
          "memory_usage_gb": 6.5,
          "context_length": 4096,
          "benchmark_scores": {
            "code_generation": 85.2,
            "code_completion": 92.1
          }
        },
        "compatibility": {
          "ollama_versions": [">=0.1.20"],
          "gpu_memory_min": "8GB",
          "supported_platforms": ["linux/amd64", "linux/arm64"]
        },
        "deployment": {
          "environments": ["development", "staging", "production"],
          "resource_requirements": {
            "gpu": 1,
            "memory": "8Gi",
            "cpu": 2
          },
          "health_check": {
            "endpoint": "/api/tags",
            "timeout": "30s"
          }
        },
        "quality": {
          "security_scan": "passed",
          "performance_tests": "passed",
          "integration_tests": "passed",
          "approval_status": "approved",
          "approved_by": "ai-governance-team"
        }
      }
    }
```

### 16.4 Automated Model Management Pipeline

**Model Versioning Pipeline**
```yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: model-versioning-pipeline
  namespace: ai-infrastructure
spec:
  params:
  - name: model-name
    type: string
  - name: source-model
    type: string
  - name: version-type
    type: string
    description: "major, minor, patch"
  - name: environment
    type: string
    default: "development"
  
  workspaces:
  - name: model-workspace
  
  tasks:
  # 1. Fetch source model
  - name: fetch-model
    taskRef:
      name: fetch-model-task
    params:
    - name: model-name
      value: $(params.source-model)
    workspaces:
    - name: output
      workspace: model-workspace
  
  # 2. Generate new version
  - name: version-model
    taskRef:
      name: version-model-task
    runAfter: [fetch-model]
    params:
    - name: model-name
      value: $(params.model-name)
    - name: version-type
      value: $(params.version-type)
    workspaces:
    - name: model-data
      workspace: model-workspace
  
  # 3. Quality validation
  - name: validate-model
    taskRef:
      name: model-validation-task
    runAfter: [version-model]
    params:
    - name: model-path
      value: "$(workspaces.model-workspace.path)/$(params.model-name)"
    workspaces:
    - name: model-data
      workspace: model-workspace
  
  # 4. Security scanning
  - name: security-scan
    taskRef:
      name: security-scan-task
    runAfter: [validate-model]
    params:
    - name: model-path
      value: "$(workspaces.model-workspace.path)/$(params.model-name)"
  
  # 5. Performance benchmarking
  - name: benchmark-model
    taskRef:
      name: benchmark-task
    runAfter: [security-scan]
    params:
    - name: model-name
      value: $(params.model-name)
    - name: environment
      value: $(params.environment)
    workspaces:
    - name: model-data
      workspace: model-workspace
  
  # 6. Register model version
  - name: register-model
    taskRef:
      name: register-model-task
    runAfter: [benchmark-model]
    params:
    - name: model-name
      value: $(params.model-name)
    - name: benchmark-results
      value: "$(tasks.benchmark-model.results.performance-score)"
    workspaces:
    - name: model-data
      workspace: model-workspace
  
  # 7. Deploy to environment
  - name: deploy-model
    taskRef:
      name: deploy-model-task
    runAfter: [register-model]
    when:
    - input: "$(tasks.validate-model.results.validation-status)"
      operator: in
      values: ["passed"]
    params:
    - name: model-name
      value: $(params.model-name)
    - name: environment
      value: $(params.environment)
```

### 16.5 Model Validation and Testing

**Automated Model Validation Task**
```yaml
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: model-validation-task
  namespace: ai-infrastructure
spec:
  params:
  - name: model-path
    type: string
  results:
  - name: validation-status
    description: "passed or failed"
  - name: performance-metrics
    description: "JSON performance metrics"
  
  steps:
  - name: validate-format
    image: your-registry.com/model-validator:latest
    script: |
      #!/bin/bash
      set -e
      
      MODEL_PATH="$(params.model-path)"
      echo "Validating model format at: $MODEL_PATH"
      
      # Check file format
      if [[ "$MODEL_PATH" == *.gguf ]]; then
        echo "✓ GGUF format detected"
        python3 /tools/validate_gguf.py "$MODEL_PATH"
      elif [[ "$MODEL_PATH" == *.safetensors ]]; then
        echo "✓ SafeTensors format detected"
        python3 /tools/validate_safetensors.py "$MODEL_PATH"
      else
        echo "✗ Unsupported model format"
        exit 1
      fi
      
      echo "✓ Model format validation passed"
  
  - name: test-inference
    image: ollama/ollama:latest
    script: |
      #!/bin/bash
      set -e
      
      MODEL_PATH="$(params.model-path)"
      echo "Testing model inference..."
      
      # Start Ollama in background
      ollama serve &
      OLLAMA_PID=$!
      sleep 10
      
      # Load the model
      MODEL_NAME=$(basename "$MODEL_PATH" .gguf)
      cp "$MODEL_PATH" /root/.ollama/models/
      
      # Test basic inference
      RESPONSE=$(ollama run "$MODEL_NAME" "Write a hello world function in Python" --timeout 30s)
      
      if [[ -n "$RESPONSE" ]]; then
        echo "✓ Model inference test passed"
        echo "Response: $RESPONSE"
      else
        echo "✗ Model inference test failed"
        exit 1
      fi
      
      # Clean up
      kill $OLLAMA_PID 2>/dev/null || true
  
  - name: performance-benchmark
    image: your-registry.com/model-benchmarker:latest
    script: |
      #!/bin/bash
      set -e
      
      MODEL_PATH="$(params.model-path)"
      echo "Running performance benchmarks..."
      
      # Run standardized benchmarks
      python3 /tools/benchmark_model.py \
        --model-path "$MODEL_PATH" \
        --output /tmp/benchmark-results.json \
        --tests "code_generation,code_completion,reasoning"
      
      # Extract key metrics
      TOKENS_PER_SEC=$(jq -r '.tokens_per_second' /tmp/benchmark-results.json)
      MEMORY_USAGE=$(jq -r '.memory_usage_gb' /tmp/benchmark-results.json)
      
      echo "Performance Metrics:"
      echo "- Tokens/sec: $TOKENS_PER_SEC"
      echo "- Memory usage: ${MEMORY_USAGE}GB"
      
      # Set results
      echo "passed" > $(results.validation-status.path)
      cat /tmp/benchmark-results.json > $(results.performance-metrics.path)
```

### 16.6 Model Deployment Strategies

**Blue-Green Deployment for Models**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: ollama-model-rollout
  namespace: ai-production
spec:
  replicas: 4
  strategy:
    blueGreen:
      activeService: ollama-active-service
      previewService: ollama-preview-service
      autoPromotionEnabled: false
      scaleDownDelaySeconds: 30
      prePromotionAnalysis:
        templates:
        - templateName: model-performance-analysis
        args:
        - name: service-name
          value: ollama-preview-service
      postPromotionAnalysis:
        templates:
        - templateName: model-stability-analysis
        args:
        - name: service-name
          value: ollama-active-service
  selector:
    matchLabels:
      app: ollama-model
  template:
    metadata:
      labels:
        app: ollama-model
    spec:
      containers:
      - name: ollama
        image: your-registry.com/ollama-with-model:v1.0
        env:
        - name: MODEL_VERSION
          value: "codellama:7b-v1.0"
        resources:
          requests:
            nvidia.com/gpu: 1
            memory: 8Gi
          limits:
            nvidia.com/gpu: 1
            memory: 16Gi

---
# Analysis template for model performance
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: model-performance-analysis
  namespace: ai-production
spec:
  args:
  - name: service-name
  metrics:
  - name: response-time
    interval: 30s
    count: 10
    successCondition: result < 2000  # 2 seconds
    provider:
      prometheus:
        address: http://prometheus:9090
        query: |
          histogram_quantile(0.95,
            rate(ollama_request_duration_seconds_bucket{service="{{args.service-name}}"}[2m])
          ) * 1000
  
  - name: error-rate
    interval: 30s
    count: 10
    successCondition: result < 0.05  # 5% error rate
    provider:
      prometheus:
        address: http://prometheus:9090
        query: |
          rate(ollama_requests_total{service="{{args.service-name}}",status!="200"}[2m]) /
          rate(ollama_requests_total{service="{{args.service-name}}"}[2m])
  
  - name: gpu-utilization
    interval: 30s
    count: 5
    successCondition: result > 0.3  # At least 30% GPU utilization
    provider:
      prometheus:
        address: http://prometheus:9090
        query: |
          avg(DCGM_FI_DEV_GPU_UTIL{service="{{args.service-name}}"}) / 100
```

### 16.7 Model Rollback and Recovery

**Automated Rollback Script**
```bash
#!/bin/bash
# Model Rollback Utility

set -e

NAMESPACE=${1:-"ai-production"}
ROLLBACK_VERSION=${2:-"previous"}

function get_current_version() {
    oc get rollout ollama-model-rollout -n $NAMESPACE -o jsonpath='{.status.currentPodHash}'
}

function get_previous_version() {
    oc get replicasets -n $NAMESPACE -l app=ollama-model --sort-by=.metadata.creationTimestamp -o jsonpath='{.items[-2].metadata.labels.pod-template-hash}'
}

function rollback_model() {
    local target_version=$1
    
    echo "=== Model Rollback Started ==="
    echo "Namespace: $NAMESPACE"
    echo "Target Version: $target_version"
    
    # Get current status
    CURRENT_VERSION=$(get_current_version)
    echo "Current Version: $CURRENT_VERSION"
    
    # Perform rollback
    if [ "$target_version" = "previous" ]; then
        echo "Rolling back to previous version..."
        oc rollout undo rollout/ollama-model-rollout -n $NAMESPACE
    else
        echo "Rolling back to specific version: $target_version"
        oc rollout undo rollout/ollama-model-rollout -n $NAMESPACE --to-revision=$target_version
    fi
    
    # Wait for rollback to complete
    echo "Waiting for rollback to complete..."
    oc rollout status rollout/ollama-model-rollout -n $NAMESPACE --timeout=600s
    
    # Verify rollback
    NEW_VERSION=$(get_current_version)
    echo "Rollback completed. New version: $NEW_VERSION"
    
    # Health check
    echo "Running post-rollback health checks..."
    sleep 30
    
    # Test model endpoint
    ENDPOINT=$(oc get route ollama-external -n $NAMESPACE -o jsonpath='{.spec.host}')
    curl -f "https://$ENDPOINT/api/tags" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo "✓ Model endpoint health check passed"
    else
        echo "✗ Model endpoint health check failed"
        exit 1
    fi
    
    echo "=== Model Rollback Completed Successfully ==="
}

function list_versions() {
    echo "=== Available Model Versions ==="
    oc rollout history rollout/ollama-model-rollout -n $NAMESPACE
}

function validate_rollback() {
    local version=$1
    echo "=== Validating Rollback Candidate ==="
    
    # Check if version exists
    oc rollout history rollout/ollama-model-rollout -n $NAMESPACE --revision=$version > /dev/null 2>&1
    
    if [ $? -ne 0 ]; then
        echo "✗ Version $version not found"
        return 1
    fi
    
    echo "✓ Version $version found and available for rollback"
    return 0
}

# Main command dispatcher
case "$1" in
    rollback)
        if [ -n "$3" ]; then
            validate_rollback "$3" && rollback_model "$3"
        else
            rollback_model "previous"
        fi
        ;;
    list)
        list_versions
        ;;
    validate)
        validate_rollback "$3"
        ;;
    *)
        echo "Usage: $0 {rollback|list|validate} [namespace] [version]"
        echo "Commands:"
        echo "  rollback [namespace] [version] - Rollback to previous or specific version"
        echo "  list [namespace]               - List available versions"
        echo "  validate [namespace] [version] - Validate rollback candidate"
        echo ""
        echo "Examples:"
        echo "  $0 rollback ai-production previous"
        echo "  $0 rollback ai-production 5"
        echo "  $0 list ai-production"
        exit 1
        ;;
esac
```

### 16.8 Model Governance and Approval Workflow

**Model Approval Pipeline**
```yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: model-approval-pipeline
  namespace: ai-infrastructure
spec:
  params:
  - name: model-name
    type: string
  - name: model-version
    type: string
  - name: target-environment
    type: string
  
  tasks:
  # 1. Quality Gates
  - name: quality-review
    taskRef:
      name: quality-review-task
    params:
    - name: model-name
      value: $(params.model-name)
    - name: model-version
      value: $(params.model-version)
  
  # 2. Security Review
  - name: security-review
    taskRef:
      name: security-review-task
    runAfter: [quality-review]
    params:
    - name: model-name
      value: $(params.model-name)
  
  # 3. Performance Validation
  - name: performance-validation
    taskRef:
      name: performance-validation-task
    runAfter: [security-review]
    params:
    - name: model-name
      value: $(params.model-name)
    - name: environment
      value: $(params.target-environment)
  
  # 4. Compliance Check
  - name: compliance-check
    taskRef:
      name: compliance-check-task
    runAfter: [performance-validation]
    params:
    - name: model-name
      value: $(params.model-name)
  
  # 5. Approval Gate (Manual)
  - name: manual-approval
    taskRef:
      name: manual-approval-task
    runAfter: [compliance-check]
    params:
    - name: model-name
      value: $(params.model-name)
    - name: approvers
      value: "ai-governance-team,security-team"
  
  # 6. Production Deployment
  - name: production-deploy
    taskRef:
      name: production-deploy-task
    runAfter: [manual-approval]
    when:
    - input: "$(tasks.manual-approval.results.approval-status)"
      operator: in
      values: ["approved"]
    params:
    - name: model-name
      value: $(params.model-name)
    - name: model-version
      value: $(params.model-version)
```

This comprehensive model versioning system provides:

✅ **Semantic Versioning** with automated version management  
✅ **Model Registry** for centralized model storage and metadata  
✅ **Automated Validation** with quality gates and performance benchmarks  
✅ **Blue-Green Deployments** for safe model updates  
✅ **Rollback Capabilities** with automated recovery procedures  
✅ **Governance Workflow** with approval gates and compliance checks  
✅ **Complete Audit Trail** for regulatory compliance  

This ensures your organization can safely deploy, update, and manage AI models at enterprise scale while maintaining quality, security, and operational reliability.
```